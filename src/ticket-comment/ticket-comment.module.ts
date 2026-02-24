import { Module } from '@nestjs/common';
import { TicketCommentController } from './ticket-comment.controller';
import { TicketCommentService } from './ticket-comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketComment } from './ticket-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketComment])],
  controllers: [TicketCommentController],
  providers: [TicketCommentService],
})
export class TicketCommentModule {}
