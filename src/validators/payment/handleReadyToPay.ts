import { IsString } from "@nestjs/class-validator";

export class HandleReadyToPay {
    @IsString()
    token: string;
}