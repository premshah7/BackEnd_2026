import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketStatusLog } from './status-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketStatusLog])],
})
export class StatusLogModule {}
