import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './modules/payment.module';
import { Payment, PaymentModel } from './models/Payment';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING!),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentModel }]),
    PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
