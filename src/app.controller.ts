import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
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

  @Render("callback")
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

  @Get("payment/readyToPay")
  async readyToPay(@Query() query: any) {
    return this.paymentService.handleReadyToPay(query);
  }

  @Render("readyToPayDynamic")
  @Get("payment/readyToPayDynamic")
  async readyToPayDynamic(@Query() query: any) {
    return this.paymentService.readyToPayDynamicPage(query);
  }

  @Post("payment/readyToPayDynamic/process")
  async readyToPayDynamicProcess(@Body() body: any) {
    return this.paymentService.handleReadyToPayDynamic(body);
  }

  @Post("admin/payment/getReadyToPayLink")
  async getReadyToPayLink(@Body() body: any) {
    return this.paymentService.getReadyToPayLink(body);
  }
}
 