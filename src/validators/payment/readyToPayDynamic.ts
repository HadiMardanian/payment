import { IsString } from "@nestjs/class-validator";

export class ReadyToPayDynamic {
    @IsString()
    token: string;
}