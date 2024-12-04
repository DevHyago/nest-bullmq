import { Queues } from '@app/shared';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor(Queues.BILLING)
export class PaymentIntentProcessor extends WorkerHost {
  private logger = new Logger(PaymentIntentProcessor.name);

  async process(job: Job): Promise<unknown> {
    throw new Error('Generic Error');
    this.logger.log(`Process Job id: ${job.id}, name: ${job.name}`);
    return true;
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    const { id, name, queueName, finishedOn, returnvalue } = job;
    const completionTime = finishedOn ? new Date(finishedOn).toISOString() : '';
    this.logger.log(
      `Completed Job id: ${id}, name: ${name} completed in queue ${queueName} on ${completionTime}. Result: ${returnvalue}`,
    );
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    const { id, name, progress } = job;
    this.logger.log(`
      Progress Job id: ${id}, name: ${name} completes ${progress}%
    `);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    const { id, name, queueName, failedReason } = job;
    this.logger.error(`
      Failed Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}
    `);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    const { id, name, queueName, timestamp } = job;
    const startTime = timestamp ? new Date(timestamp).toISOString() : '';
    this.logger.log(`
      OnActive Job id: ${id}, name: ${name} starts in queue ${queueName} on ${startTime}.
    `);
  }
}
