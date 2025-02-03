import { IsIn, IsMongoId } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Define the GatewayType as an enum for better type safety and reusability
export enum GatewayType {
  ZARINPAL = "zarinpal",
  SHEPA = "shepa",
  ZIBAL = "zibal",
}

export class StartWaitingPayment {
  @ApiProperty({
    description: 'The MongoDB ID of the payment',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  paymentId: string;

  @ApiProperty({
    description: 'The gateway to be used for the payment',
    enum: GatewayType,
    example: GatewayType.ZARINPAL,
  })
  @IsIn(Object.values(GatewayType))
  gateway: GatewayType;
}