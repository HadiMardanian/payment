import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ShepaService } from './shepa.service';
import { ZarinpalService } from './zarinpal.service';

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

type PaymentRequestResponse = { isOk: boolean, link: string | null };

@Injectable()
export class PaymentService {
    constructor(
        private readonly shepaService: ShepaService,
        private readonly zarinpalService: ZarinpalService,
    ){}
    async testpayment({ amount, description, gateway, email, mobile }: PaymentRequestBody) {
        try {
            let gw = gateway !== "shepa" && gateway !== "zarinpal" ? "shepa" : gateway;
            let result: PaymentRequestResponse = { isOk: false, link: null };
            if(gw === "shepa") {
                result = await this.shepaService.init({ amount, description, email, mobile })
            }
            else if(gw === "zarinpal") {
                result = await this.zarinpalService.init({ amount, description, email, mobile })
            }
            return result;
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

    async paymentStatus() {
        
    }
}
