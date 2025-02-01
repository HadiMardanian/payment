import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './services/payment.service';

@Controller()
export class AppController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("payment/request")
  async paymentRequest(@Body() body: any) { 
    return await this.paymentService.testpayment(body);
  }

  @Get("cb")
  async callback(@Query() query: any) {
    return await this.paymentService.handleCallback(query);
  }
}
 