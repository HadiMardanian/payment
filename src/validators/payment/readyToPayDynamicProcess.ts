import { IsEmail, IsInt, IsOptional, IsString, Min } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ReadyToPayDynamicProcess {
  @ApiProperty({
    description: 'The token for the payment process',
    example: 'abc123xyz456',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'The amount to be paid (must be at least 1000)',
    example: 1500,
  })
  @IsInt()
  @Min(1000)
  amount: number;

  @ApiPropertyOptional({
    description: 'The email address of the payer (optional)',
    example: 'payer@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'A description of the payment (optional)',
    example: 'Payment for subscription',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}