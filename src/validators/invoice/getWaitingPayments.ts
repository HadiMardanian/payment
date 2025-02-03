import { IsMongoId } from "@nestjs/class-validator"
export class GetInvoiceWaitingPayments {
    @IsMongoId()
    invoiceId: string;
}
