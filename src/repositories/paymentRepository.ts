import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from 'src/models/Payment';
import { Model } from "mongoose";

type CreatePaymentData = {
    gateway: "zarinpal" | "shepa";
    authority: string;
    amount: number;
    description: string;
    mobile?: string;
    email?: string;
}

type UpdatePaymentData = {
    status?: "pending" | "failed" | "success" | "canceled";
    description?: string;
    mobile?: string;
    email?: string;
}

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
    ) { }

    async createPayment(data: CreatePaymentData) {
        const createPayload: Payment = {
            amount: data.amount,
            authority: data.authority,
            description: data.authority,
            gateway: data.gateway,
            status: "pending",
        }; 
        if(data.mobile) createPayload.mobile = data.mobile;
        if(data.email) createPayload.email = data.email;

        const payment = new this.paymentModel(createPayload);

        const createResult = await payment.save();
        return createResult;
    }

    async findPaymentByMobile(mobile: string) {
        return await this.paymentModel.findOne({ mobile });
    }
    async findPaymentByEmail(email: string) {
        return await this.paymentModel.findOne({ email });
    }
    async findPaymentByAuthority(authority: string) {
        return await this.paymentModel.findOne({ authority });
    }
    async updatePaymentByAuthority(authority: string, payload: UpdatePaymentData) {
        const updatePayload: UpdatePaymentData = {};
        if(payload.description) updatePayload.description;
        if(payload.email) updatePayload.email;
        if(payload.mobile) updatePayload.mobile;
        if(payload.status) updatePayload.status;
        
        const result = await this.paymentModel.findOneAndUpdate(
            { authority }, 
            { $set: updatePayload }
        );
        return result;
    }
}
