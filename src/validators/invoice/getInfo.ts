import { IsMongoId } from "@nestjs/class-validator"
export class GetInvoiceInfo {
    @IsMongoId()
    invoiceId: string;
}
