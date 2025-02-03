import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateInvoice } from './validators/invoice/createInvoice';
import { GetInvoiceWaitingPayments } from './validators/invoice/getWaitingPayments';
import { GetInvoiceInfo } from './validators/invoice/getInfo';
import { PaymentRequest } from './validators/payment/paymentRequest';
import { GetPaymentStatus } from './validators/payment/paymentStatus';
import { PaymentReverse } from './validators/payment/paymentReverse';
import { StartWaitingPayment } from './validators/payment/startWaitingPayment';
import { HandleReadyToPay } from './validators/payment/handleReadyToPay';
import { ReadyToPayDynamic } from './validators/payment/readyToPayDynamic';
import { ReadyToPayDynamicProcess } from './validators/payment/readyToPayDynamicProcess';
import { GetReadyToPayLink } from './validators/payment/getReadyToPayLink';

@Controller()
export class AppController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiTags('Invoice')
  @Post("invoice/create")
  async createInvoice(@Body() body: CreateInvoice) {
    return await this.paymentService.createInvoice(body);
  }

  @ApiTags('Invoice')
  @Get("invoice/getInfo")
  async getInvoiceInfo(@Query() query: GetInvoiceInfo) {
    return this.paymentService.getInvoiceInfo(query);
  }

  @ApiTags('Payment')
  @Post("payment/request")
  async paymentRequest(@Body() body: PaymentRequest) { 
    return await this.paymentService.paymentRequest(body);
  }

  @ApiTags('Payment')
  @Get("payment/status")
  async paymentStatus(@Query() query: GetPaymentStatus) {
    return this.paymentService.paymentStatus(query);
  }

  @Render("callback")
  @Get("cb")
  async callback(@Query() query: any) {
    return await this.paymentService.handleCallback(query);
  }

  @ApiTags('Payment')
  @Post("payment/reverse")
  async refundPayment(@Body() body: PaymentReverse) {
    return this.paymentService.reverse(body);
  }

  @ApiTags('Invoice')
  @Post("invoice/getWaitingPayments")
  async getWaitingPayments(@Body() body: GetInvoiceWaitingPayments) {
    return this.paymentService.getWaitingPayments(body);
  }
  
  @ApiTags('Payment')
  @Post("payment/startWaiting")
  async startWaitingPayment(@Body() body: StartWaitingPayment) {
    return this.paymentService.startWaitingPayment(body);
  }

  @ApiTags('Payment')
  @Get("payment/readyToPay")
  async readyToPay(@Query() query: HandleReadyToPay) {
    return this.paymentService.handleReadyToPay(query);
  }

  @Render("readyToPayDynamic")
  @Get("payment/readyToPayDynamic")
  async readyToPayDynamic(@Query() query: ReadyToPayDynamic) {
    return this.paymentService.readyToPayDynamicPage(query);
  }

  @ApiTags('Payment')
  @Post("payment/readyToPayDynamic/process")
  async readyToPayDynamicProcess(@Body() body: ReadyToPayDynamicProcess) {
    return this.paymentService.handleReadyToPayDynamic(body);
  }

  @ApiTags('Payment', 'Admin')
  @Post("admin/payment/getReadyToPayLink")
  async getReadyToPayLink(@Body() body: GetReadyToPayLink) {
    return this.paymentService.getReadyToPayLink(body);
  }

  @ApiTags('Payment', 'Admin')
  @Get("admin/payment/allPaymentsStatus")
  async getAllPaymentsStatus() {
    return this.paymentService.getAllPaymentsStatus();
  }
}
 