import { Injectable } from '@nestjs/common';
import * as Shepa from "shepa-payment-getaway";
@Injectable()
export class AppService {
  async getHello() {
    const shepa = new Shepa("sandbox");
    console.log(shepa);
    return 'Hello Worlssssd!';
  }
}
