import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ShepaService } from './shepa.service';
import { ZarinpalService } from './zarinpal.service';
import { InvoiceRepository } from 'src/repositories/invoiceRepository';
import { PaymentDocument } from 'src/models/Payment';

type ShepaQuery = {
    status: "success" | "failed";
    token: string;
}

type ZarinpalQuery = {
    Authority: string;
    Status: "OK" | "NOK"
}

type CallbackQuery = ZarinpalQuery | ShepaQuery;
const IsZarinpalQuery = (query: any): query is ZarinpalQuery => (query.Authority && query.Status);
const IsShepaQuery = (query: any): query is ShepaQuery => (query.status && query.token);

type GatewayType = "zarinpal" | "shepa";

type PaymentRequestBody = {
    invoiceId: string;
    gateway: GatewayType;
    amount: number;
    description: string;
    mobile?: string;
    email?: string;
}

type PaymentRequestResponse = { isOk: boolean, link?: string, authority?: string };

type CreateInvoiceBody = {
    title: string;
    totalAmount: number;
    mobile?: string;
    email?: string;
};
type GetInvoiceInfo = { invoiceId: string };

type ReverseResponse = {
    isOk: boolean;
    result?: any;
    errors: any[];
}

@Injectable()
export class PaymentService {
    constructor(
        private readonly shepaService: ShepaService,
        private readonly zarinpalService: ZarinpalService,
        private readonly invoiceRepository: InvoiceRepository,
    ){}
    async createInvoice(data: CreateInvoiceBody) {
        const invoice = await this.invoiceRepository.createInvoice({
            title: data.title,
            totalAmount: data.totalAmount,
            email: data.email,
            mobile: data.mobile,
        });
        return invoice;
    }
    async getInvoiceInfo({ invoiceId }: GetInvoiceInfo) {
        const invoice = await this.invoiceRepository.findInvoiceById(invoiceId)
        if(!invoice) {
            throw new NotFoundException("Invoice not found");
        }

        return invoice;
    }
    async paymentRequest({ invoiceId, amount, description, gateway, email, mobile }: PaymentRequestBody) {
        try {
            const invoice = await this.invoiceRepository.findInvoiceById(invoiceId);
            if(!invoice) {
                throw new NotFoundException("Invoice not found");
            }
            const donePaymentsAmount = invoice.payments
                .filter(p => p.status === "success")
                .reduce((total, p) => total + p.amount, 0);
            if(donePaymentsAmount + amount > invoice.totalAmount) {
                throw new BadRequestException("Invalid paymnt amount");
            }

            let gw = gateway !== "shepa" && gateway !== "zarinpal" ? "shepa" : gateway;
            let result: PaymentRequestResponse = { isOk: false };
            if(gw === "shepa") {
                result = await this.shepaService.init({ amount, description, email, mobile })
            }
            else if(gw === "zarinpal") {
                result = await this.zarinpalService.init({ amount, description, email, mobile })
            }
            if(!result.isOk || !result.authority) {
                throw new Error("Payment request failed");
            }
            
            const updatedInvoice = await this.invoiceRepository.addNewPayment(invoiceId, {
                amount,
                description,
                authority: result.authority,
                gateway,
                mobile,
                email
            })

            return { gateway: result, invoiceId: invoiceId, authority: result.authority };
        } catch(error) {
            throw new InternalServerErrorException(error?.message);
        }
    }

    async handleCallback(query: CallbackQuery) {
        let authority: string;
        let isOk: boolean;
        if(IsShepaQuery(query)) {
            // handle for shepa
            authority = query.token;
            isOk = query.status === "success";
        }
        else if(IsZarinpalQuery(query)) {
            // handle for zarin pal
            authority = query.Authority;
            isOk = query.Status === "OK";
        } 
        else {
            throw new InternalServerErrorException("Unknown callback query");
        }

        if(isOk) {
            await this.invoiceRepository.makePaymentSuccess(authority);
        } else {
            await this.invoiceRepository.makePaymentFailed(authority);
        };

        return { isOk };
    }

    async paymentStatus({ paymentId, invoiceId } : { paymentId: string, invoiceId: string }) {
        const invoice = await this.invoiceRepository.getSinglePaymentStatus(invoiceId, paymentId);
        let payment: PaymentDocument | undefined;
        if(!invoice || !(payment = invoice.payments.find(p => p._id.equals(paymentId)))) {
            throw new NotFoundException("Payment not found");
        }

        return { status: payment.status };
    }

    async reverse({ invoiceId, authority }: { authority: string, invoiceId: string }) {
        const invoice = await this.invoiceRepository.findInvoiceById(invoiceId);
        let payment: PaymentDocument | undefined;
        if(
            !invoice ||
            !(payment = invoice.payments.find(p => p.authority === authority)) ||
            payment.status !== "success" || 
            (payment.gateway !== "shepa" && payment.gateway !== "zarinpal")
        ) {
            throw new NotFoundException("Payment not found");
        }

        let reverseResult: ReverseResponse | null = null;
        if(payment.gateway === "zarinpal") {
            reverseResult = await this.zarinpalService.reverse(authority);
        } else if(payment.gateway === "shepa") {
            reverseResult = await this.shepaService.reverse(payment.amount, -1);
        }

        if(reverseResult && reverseResult?.isOk) {
            console.log(await this.invoiceRepository.makePaymentReversed(authority));
        }
        return reverseResult;
    }
}
