import { IsIn, IsMongoId } from "@nestjs/class-validator";

type GatewayType = "zarinpal" | "shepa" | "zibal";


export class StartWaitingPayment {
    @IsMongoId()
    paymentId: string;
    
    @IsIn(["zarinpal", "shepa", "zibal"])
    gateway: GatewayType;
}