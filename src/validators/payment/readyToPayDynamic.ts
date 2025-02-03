import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReadyToPayDynamic {
  @ApiProperty({
    description: 'The token associated with the payment',
    example: 'abc123xyz456',
  })
  @IsString()
  token: string;
}