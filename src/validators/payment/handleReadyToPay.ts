import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class HandleReadyToPay {
    @ApiProperty({
        description: 'The token associated with the payment'
    })
    @IsString()
    token: string;
}
