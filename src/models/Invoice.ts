import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Payment, PaymentDocument } from './Payment';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Invoice {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    totalAmount: number;

    @Prop()
    mobile?: string;

    @Prop()
    email?: string;

    @Prop({ type: [Payment] })
    payments: PaymentDocument[];

    @Prop({ required: true })
    isDone: boolean;
}

export const InvoiceModel = SchemaFactory.createForClass(Invoice);