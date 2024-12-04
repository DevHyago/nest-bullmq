import { NestFactory } from '@nestjs/core';
import { BullBoardModule } from './bull-board.module';

async function bootstrap() {
  const app = await NestFactory.create(BullBoardModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
