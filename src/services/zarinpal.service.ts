import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { randomUUID } from 'crypto';
import ZarinPal from 'zarinpal-node-sdk';

type PaymentRequestPayload = {
    amount: number;
    description: string;
    mobile?: string;
    email?: string;
}
type PaymentRequestResult = {
    data: {
        authority: string;
        fee: number;
        fee_type: string;
        code: number;
        message: string;
    },
    errors: Array<any>
}
type ZarinpalPaymentRequestBody = {
    mobile?: string,
    email?: string,
    amount: number,
    callback_url: string,
    description: string
};

type ReverseResponse = {
    isOk: boolean;
    result?: any;
    errors: any[];
}

@Injectable()
export class ZarinpalService {
    private gateway: ZarinPal;

    constructor() {
        this.gateway = new ZarinPal({
            merchantId: randomUUID(),
            sandbox: true
        });
    }

    async init(data: PaymentRequestPayload) {
        const body: ZarinpalPaymentRequestBody = {
            amount: data.amount,
            callback_url: process.env.CALLBACK_URL,
            description: data.description,
        };
        if (data.mobile) body.mobile = data.mobile;
        if (data.email) body.email = data.email;

        const result: PaymentRequestResult = await this.gateway.payments.create(body);
        if (result.data.code !== 100 && result.data.code !== 101) {
            return { isOk: false }
        }
        const paymentRedirect = await this.gateway.payments.getRedirectUrl(result.data.authority);

        return { isOk: true, link: paymentRedirect, authority: result.data.authority };
    }

    async getPaymentStatus(amount: number, authority: string) {
        const result = await this.gateway.verifications.verify({ amount, authority });
        return result;
    }

    async reverse(authority: string): Promise<ReverseResponse> {
        try {
            const result: { data: { code: number, message: string } } = await this.gateway.reversals.reverse({ authority });
            if(result?.data?.code !== 100)
                throw new Error("Payment reverse failed");

            return { isOk: true, errors: [] };
        } catch (error) {
            let errors: any[] = [];
            if(error instanceof AxiosError) {
                errors.push(error.response?.data);
            } else {
                errors.push(error?.message);
            }
            return { isOk: false, errors };
        }
    }
}
