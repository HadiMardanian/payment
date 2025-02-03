import { IsEmail, IsIn, IsInt, IsMobilePhone, IsMongoId, IsOptional, IsString, Min } from "@nestjs/class-validator";

type GatewayType = "zarinpal" | "shepa" | "zibal";

export class PaymentRequest {
    @IsMongoId()
    invoiceId: string;
    
    @IsIn(["zarinpal", "shepa", "zibal"])
    gateway: GatewayType;

    @IsInt()
    @Min(1000)
    amount: number;
    
    @IsString()
    description: string;
    
    @IsMobilePhone()
    @IsOptional()
    mobile?: string;
    
    @IsEmail()
    @IsOptional()
    email?: string;
}