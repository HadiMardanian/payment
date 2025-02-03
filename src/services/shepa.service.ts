import { Injectable, Logger } from '@nestjs/common';
import Shepa from "shepa-payment-getaway";

type PaymentVerifyResult = {
    amount: number;
    transId: number;
    refid: string;
    cardNumber: string;
}

type PaymentRequestPayload = {
    amount: number;
    description: string;
    mobile?: string;
    email?: string;
}

type ReverseResponse = {
    isOk: boolean;
    result?: any;
    errors: any[];
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
            const authority = result.split("/").pop();
            return { isOk: true, link: String(result), authority };
        } catch (error) {
            return { isOk: false };
        }
    }

    async verify(authority: string, amount: number) {
        const result: PaymentVerifyResult= await this.shepa.verify(authority, amount);
        if(!result["refid"]) {
            return null;
        }
        return result;
    }

    async reverse(amount: number, transactionId: number) {
        return { errors: [], isOk: false } as ReverseResponse
    }
}
