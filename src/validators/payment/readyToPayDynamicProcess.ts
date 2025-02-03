import { IsEmail, IsInt, IsOptional, IsString, Min } from "@nestjs/class-validator";

export class ReadyToPayDynamicProcess {
    @IsString()
    token: string;

    @IsInt()
    @Min(1000)
    amount: number;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    description?: string;
}