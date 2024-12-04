import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Queues, SharedModule } from '@app/shared';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    SharedModule,
    BullModule.registerQueue({
      name: Queues.BILLING,
      defaultJobOptions: {
        // removeOnComplete: true,
        // removeOnFail: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
