import { IsMongoId } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetInvoiceWaitingPayments {
    @ApiProperty({
        description: 'The unique identifier of the invoice',
        default: '605c72ef153207001f85e10'
    })
    @IsMongoId()
    invoiceId: string;
}
