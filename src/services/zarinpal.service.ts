import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
}
