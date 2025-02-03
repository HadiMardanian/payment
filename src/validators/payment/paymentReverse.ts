import { IsMongoId, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaymentReverse {
    @ApiProperty({
        description: 'The authority for the payment reverse'
    })
    @IsString()
    authority: string;

    @ApiProperty({
        description: 'The unique identifier of the invoice'
    })
    @IsMongoId()
    invoiceId: string;
}
