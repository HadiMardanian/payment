import { IsEmail, IsInt, IsMobilePhone, IsOptional, IsString } from "@nestjs/class-validator"
export class CreateInvoice {
    @IsString()
    title: string;
    
    @IsInt()
    totalAmount: number;
    
    @IsMobilePhone()
    @IsOptional()
    mobile?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}
