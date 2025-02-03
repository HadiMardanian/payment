import { IsIn, IsMongoId } from "@nestjs/class-validator";

type GatewayType = "zarinpal" | "shepa";


export class StartWaitingPayment {
    @IsMongoId()
    paymentId: string;
    
    @IsIn(["zarinpal", "shepa"])
    gateway: GatewayType;
}