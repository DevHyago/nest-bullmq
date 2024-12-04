import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreatePaymentIntent, Queues } from '@app/shared';

@Injectable()
export class AppService {
  private id = 1;

  constructor(
    @InjectQueue(Queues.BILLING) private readonly billingQueue: Queue,
  ) {}

  async handlePaymentIntent(data: CreatePaymentIntent) {
    await this.billingQueue.add('process_payment', { ...data, id: this.id });
    this.id++;
  }
}
