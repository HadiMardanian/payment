import { IsMongoId } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetPaymentStatus {
    @ApiProperty({
        description: 'The unique identifier of the payment'
    })
    @IsMongoId()
    paymentId: string;

    @ApiProperty({
        description: 'The unique identifier of the invoice'
    })
    @IsMongoId()
    invoiceId: string;
}
