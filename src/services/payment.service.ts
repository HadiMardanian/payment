import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ShepaService } from './shepa.service';
import { ZarinpalService } from './zarinpal.service';
import { PaymentRepository } from 'src/repositories/paymentRepository';

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
    gateway: GatewayType;
    amount: number;
    description: string;
    mobile?: string;
    email?: string;
}

type PaymentRequestResponse = { isOk: boolean, link?: string, authority?: string };

@Injectable()
export class PaymentService {
    constructor(
        private readonly shepaService: ShepaService,
        private readonly zarinpalService: ZarinpalService,
        private readonly paymentRepository: PaymentRepository,
    ){}
    async paymentRequest({ amount, description, gateway, email, mobile }: PaymentRequestBody) {
        try {
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
            const payment = await this.paymentRepository.createPayment({
                amount,
                description,
                authority: result.authority,
                gateway,
                mobile,
                email
            });

            return { gateway: result, payment };
        } catch(error) {
            throw new InternalServerErrorException(error?.message);
        }
    }

    async handleCallback(query: CallbackQuery) {
        console.log(query)
        if(IsShepaQuery(query)) {
            // handle for shepa
            return query;
        }
        else if(IsZarinpalQuery(query)) {
            // handle for zarin pal
            return query;
        } 
        else {
            throw new InternalServerErrorException("Unknown callback query");
        } 
    }

    async paymentStatus({ paymentId } : { paymentId: string }) {
        const payment = await this.paymentRepository.findPaymentById(paymentId);
        if(!payment) {
            throw new NotFoundException("Payment not found");
        }
        return payment;
    }
}
