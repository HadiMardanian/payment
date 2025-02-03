import { IsEmail, IsInt, IsMobilePhone, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInvoice {
    @ApiProperty({ 
        description: 'The title of the invoice', 
        default: 'Untitled Invoice' // Default string value
    })
    @IsString()
    title: string;

    @ApiProperty({ 
        description: 'The total amount of the invoice', 
        default: 0 // Default numeric value for totalAmount
    })
    @IsInt()
    totalAmount: number;

    @ApiProperty({
        description: 'The mobile phone number associated with the invoice',
        required: false,
        default: '09111111111' // Realistic default phone number
    })
    @IsMobilePhone()
    @IsOptional()
    mobile?: string;

    @ApiProperty({
        description: 'The email address associated with the invoice',
        required: false,
        default: 'example@example.com' // Realistic default email
    })
    @IsEmail()
    @IsOptional()
    email?: string;
}
