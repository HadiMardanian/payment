import { Injectable } from '@nestjs/common';
import axios from "axios";

type PaymentRequestPayload = {
    amount: number;
    description: string;
    mobile?: string;
    email?: string;
}
enum ResultCode {
    success = 100,
    merchant_notfound = 102,
    merchant_disabled = 103,
    merchant_invalid = 104,
    amount_min_invalid = 105,
    callback_invliid = 106,
    amount_max_invalid = 113,
    national_code_invalid = 114
}
type PaymentRequestResponse = {
    trackId: string;
    result: ResultCode;
    message: string;
}

type PaymentRequestResult = {
    isOk: boolean;
    authority?: string;
    link?: string;
}

type PaymentVerifyResponse = {
    paidAt: string;
    cardNumber: string;
    status: ZinalCallbackStatus;
    amount: number;
    refNumber: number;
    description: string;
    orderId: string;
    result: ResultCode;
    message: string;
}

enum ZinalCallbackStatus {
    pending = "-1",
    internal_error = "-2",
    paied_approved = "1",
    paied_not_approved = "2",
    canceled = "3",
    invalid_card_number = "4",
    not_enough_credit = "5",
    wront_password = "6",
    request_ratelimit = "7",
    payment_request_perday_ratelimit = "8",
    payment_amount_perday_ratelimit = "9",
    card_invalid = "10",
    switch_error = "11",
    card_not_avalible = "12",
    transaction_refund = "15",
    transaction_redunding = "16",
    transction_reversed = "18",
}

@Injectable()
export class ZibalService {
    private baseurl = process.env.ZIBAL_BASE_URL!;
    private merchant = process.env.ZIBAL_MERCHANT_ID!;

    async init(data: PaymentRequestPayload) {
        let result: PaymentRequestResult = { isOk: false };
        try {
            const response: { data: PaymentRequestResponse } = await axios.post(this.baseurl + "/v1/request", {
                merchant: this.merchant,
                amount: data.amount,
                callbackUrl: process.env.CALLBACK_URL!,

            });
            
            if(response.data.result === ResultCode.success && response.data.trackId) {
                result.isOk = true;
                result.link = this.baseurl + "/start/" + response.data.trackId;
                result.authority = response.data.trackId;
            }
        } catch (error) {
            console.error(error);
        } 
        return result;
    }

    async verify(trackId: number) {
        try {
            const response: { data: PaymentVerifyResponse } = await axios.post(this.baseurl + "/v1/verify", { 
                trackId,
                merchant: process.env.ZIBAL_MERCHANT_ID! 
            });
            
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        } 
    }
}
