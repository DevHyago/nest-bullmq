import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule as BullBoard } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queues, SharedModule } from '@app/shared';

@Module({
  imports: [
    SharedModule,
    BullModule.registerQueue(
      ...Object.values(Queues).map((queueName) => ({
        name: queueName,
      })),
    ),
    BullBoard.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullBoard.forFeature(
      ...Object.values(Queues).map((queueName) => ({
        name: queueName,
        adapter: BullMQAdapter,
      })),
    ),
  ],
  controllers: [],
  providers: [],
})
export class BullBoardModule {}
