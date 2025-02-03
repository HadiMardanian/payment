import { IsIn, IsInt, IsMobilePhone, IsMongoId, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

type GatewayType = "zarinpal" | "shepa" | "zibal";

export class GetReadyToPayLink {
    @ApiProperty({
        description: 'The amount to be paid',
        required: false,
        default: 0
    })
    @IsInt()
    @IsOptional()
    amount?: number;

    @ApiProperty({
        description: 'Description of the payment',
        required: false,
        default: ''
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Full name of the user'
    })
    @IsString()
    userFullName: string;

    @ApiProperty({
        description: 'User mobile number'
    })
    @IsMobilePhone()
    mobile: string;

    @ApiProperty({
        description: 'The payment gateway to be used',
        required: false,
        default: 'zarinpal'
    })
    @IsIn(["zarinpal", "shepa", "zibal"])
    readyToPayGateway?: GatewayType;

    @ApiProperty({
        description: 'The unique identifier of the invoice',
        required: false,
        default: '605c72ef153207001f85e10'
    })
    @IsMongoId()
    @IsOptional()
    invoiceId?: string;
}
