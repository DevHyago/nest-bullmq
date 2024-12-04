import { Queues, SharedModule } from '@app/shared';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PaymentIntentProcessor } from './billing/payment-intent.processor';

@Module({
  imports: [SharedModule, BullModule.registerQueue({ name: Queues.BILLING })],
  providers: [PaymentIntentProcessor],
})
export class QueueModule {}
