import { IsEmail, IsIn, IsInt, IsMobilePhone, IsMongoId, IsOptional, IsString, Min } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

type GatewayType = "zarinpal" | "shepa" | "zibal";

export class PaymentRequest {
    @ApiProperty({
        description: 'The unique identifier of the invoice'
    })
    @IsMongoId()
    invoiceId: string;
    
    @ApiProperty({
        description: 'The payment gateway to be used'
    })
    @IsIn(["zarinpal", "shepa", "zibal"])
    gateway: GatewayType;

    @ApiProperty({
        description: 'The amount to be paid',
        minimum: 1000
    })
    @IsInt()
    @Min(1000)
    amount: number;
    
    @ApiProperty({
        description: 'Description of the payment'
    })
    @IsString()
    description: string;
    
    @ApiProperty({
        description: 'User mobile number',
        required: false
    })
    @IsMobilePhone()
    @IsOptional()
    mobile?: string;
    
    @ApiProperty({
        description: 'User email address',
        required: false
    })
    @IsEmail()
    @IsOptional()
    email?: string;
}
