import { Injectable, Logger, Scope } from '@nestjs/common';
import * as Shepa from "shepa-payment-getaway";

type PaymentRequestPayload = {
    amount: number;
    description: string;
    mobile?: string;
    email?: string;
}

@Injectable()
export class ShepaService {
    private shepa: Shepa;
    constructor() {
        this.shepa = new Shepa(process.env.SHEPA_APIKEY!)
        Logger.log("Shepa is connected");
    }

    async init(data: PaymentRequestPayload) {
        try {
            const result = await this.shepa.send(
                data.amount,
                process.env.CALLBACK_URL,
                data.mobile,
                data.mobile,
                data.description
            );
            return { isOk: true, link: String(result) };
        } catch (error) {
            return { isOk: false, link: null };
        }
    }
}
