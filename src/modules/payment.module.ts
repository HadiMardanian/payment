import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { PaymentService } from 'src/services/payment.service';
import { ShepaService } from 'src/services/shepa.service';
import { ZarinpalService } from 'src/services/zarinpal.service';

@Module({
    providers: [
        PaymentService,
        ShepaService,
        ZarinpalService,
    ],
    controllers: [AppController]
})
export class PaymentModule {}
