import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Payment {
    @Prop({ required: true })
    gateway: "zarinpal" | "shepa";

    @Prop({ required: true })
    authority: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    description: string;

    @Prop()
    mobile?: string;

    @Prop()
    email?: string;

    @Prop({ required: true, enum: ["pending", "failed", "success", "canceled", "reversed", "waiting"] })
    status: "pending" | "failed" | "success" | "canceled" | "reversed" | "waiting";
}

export const PaymentModel = SchemaFactory.createForClass(Payment);