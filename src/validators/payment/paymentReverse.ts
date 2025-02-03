import { IsMongoId, IsString } from "@nestjs/class-validator";

export class PaymentReverse {
    @IsString()
    authority: string;

    @IsMongoId()
    invoiceId: string;
}