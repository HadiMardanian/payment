import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Invoice } from 'src/models/Invoice';
import { Payment } from 'src/models/Payment';

type CreateInvoice = {
    title: string;
    totalAmount: number;
    mobile?: string;
    email?: string;
}

type CreatePaymentData = {
    gateway: "zarinpal" | "shepa";
    authority: string;
    amount: number;
    description: string;
    mobile?: string;
    email?: string;
}

@Injectable()
export class InvoiceRepository {
    constructor(
        @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
        @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,

    ) { }

    getNewPaymentObject(data: CreatePaymentData) {
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

        return payment;
    }

    async createInvoice(data: CreateInvoice) {
        const createPayload: CreateInvoice & { isDone: boolean } = {
            title: data.title,
            isDone: false,
            totalAmount: data.totalAmount
        };
        if (data.email) createPayload.email = data.email;
        if (data.mobile) createPayload.mobile = data.mobile;


        const invoiceObj = await new this.invoiceModel(createPayload);
        return await invoiceObj.save();
    }
    async findInvoiceById(invoiceId: string) {
        return await this.invoiceModel.findOne({ _id: invoiceId });
    }

    async addNewPayment(invoiceId: string, payment: CreatePaymentData) {
        const paymentObject = this.getNewPaymentObject(payment);
        return await this.invoiceModel.findOneAndUpdate(
            { _id: invoiceId },
            { $addToSet: { payments: paymentObject } },
            { returnDocument: "after" }
        );
    }
    async getSinglePaymentStatus(invoiceId: string, paymentId: string) {
        const invoice = await this.invoiceModel.findOne({ _id: invoiceId, "payments._id": paymentId })
        return invoice;
    }
    async makePaymentSuccess(authority: string) {
        return await this.invoiceModel.findOneAndUpdate(
            { $and: [ { "payments.authority": authority }, { "payments.status": "pending" } ] },
            { "payments.$.status": "success" },
            { returnDocument: "after" }
        );
    }
    async makePaymentFailed(authority: string) {
        return await this.invoiceModel.findOneAndUpdate(
            { $and: [ { "payments.authority": authority }, { "payments.status": "pending" } ] },
            { "payments.$.status": "failed" },
            { returnDocument: "after" }
        );
    }
}
