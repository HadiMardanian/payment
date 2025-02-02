import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './services/payment.service';

@Controller()
export class AppController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("invoice/create")
  async createInvoice(@Body() body: any) {
    return await this.paymentService.createInvoice(body);
  }
  @Get("invoice/getInfo")
  async getInvoiceInfo(@Query() query: any) {
    return this.paymentService.getInvoiceInfo(query);
  }
  @Post("payment/request")
  async paymentRequest(@Body() body: any) { 
    return await this.paymentService.paymentRequest(body);
  }

  @Get("payment/status")
  async paymentStatus(@Query() query: any) {
    return this.paymentService.paymentStatus(query);
  }

  @Get("cb")
  async callback(@Query() query: any) {
    return await this.paymentService.handleCallback(query);
  }

  @Post("payment/reverse")
  async refundPayment(@Body() body: any) {
    return this.paymentService.reverse(body);
  }

  @Post("invoice/getWaitingPayments")
  async getWaitingPayments(@Body() body: any) {
    return this.paymentService.getWaitingPayments(body);
  }
  
  @Post("payment/startWaiting")
  async startWaitingPayment(@Body() body: any) {
    return this.paymentService.startWaitingPayment(body);
  }

  @Post("admin/payment/getReadyToPayLink")
  async getReadyToPayLink(@Body() body: any) {
    return this.paymentService.getReadyToPayLink(body);
  }
}
 