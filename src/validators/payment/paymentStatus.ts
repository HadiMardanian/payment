import { IsMongoId } from "@nestjs/class-validator";

export class GetPaymentStatus {
    @IsMongoId()
    paymentId: string;
    
    @IsMongoId()
    invoiceId: string;
}