import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app.controller';
import { Payment, PaymentModel } from 'src/models/Payment';
import { PaymentRepository } from 'src/repositories/paymentRepository';
import { PaymentService } from 'src/services/payment.service';
import { ShepaService } from 'src/services/shepa.service';
import { ZarinpalService } from 'src/services/zarinpal.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Payment.name, schema: PaymentModel }]),
    ],
    providers: [
        PaymentService,
        ShepaService,
        ZarinpalService,
        PaymentRepository,
    ],
    controllers: [AppController]
})
export class PaymentModule {}
