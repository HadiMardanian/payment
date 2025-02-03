import { IsIn, IsInt, IsMobilePhone, IsMongoId, IsOptional, IsString } from "@nestjs/class-validator";

type GatewayType = "zarinpal" | "shepa" | "zibal";

export class GetReadyToPayLink {
    @IsInt()
    @IsOptional()
    amount?: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    userFullName: string;

    @IsMobilePhone()
    mobile: string;

    @IsIn(["zarinpal", "shepa", "zibal"])
    readyToPayGateway?: GatewayType;

    @IsMongoId()
    @IsOptional()
    invoiceId?: string;
}