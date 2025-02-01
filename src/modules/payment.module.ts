import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app.controller';
import { Invoice, InvoiceModel } from 'src/models/Invoice';
import { Payment, PaymentModel } from 'src/models/Payment';
import { InvoiceRepository } from 'src/repositories/invoiceRepository';
import { PaymentService } from 'src/services/payment.service';
import { ShepaService } from 'src/services/shepa.service';
import { ZarinpalService } from 'src/services/zarinpal.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Payment.name, schema: PaymentModel },
            { name: Invoice.name, schema: InvoiceModel },
        ]),
    ],
    providers: [
        PaymentService,
        ShepaService,
        ZarinpalService,
        InvoiceRepository,
    ],
    controllers: [AppController]
})
export class PaymentModule {}
