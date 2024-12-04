import { Controller, Get } from '@nestjs/common';
import { BullBoardService } from './bull-board.service';

@Controller()
export class BullBoardController {
  constructor(private readonly bullBoardService: BullBoardService) {}

  @Get()
  getBoard(): string {
    const bullBoard = this.bullBoardService.createBullBoard();
    return '';
  }
}
