import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Ticket } from 'src/ticket/ticket.entity';
import { User } from 'src/user/user.entity';
import { TicketStatus } from 'src/ticket/ticket.entity';

@Entity('ticket_status_logs')
export class TicketStatusLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.statusLog, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @Column({ type: 'varchar', length: 50 })
  oldStatus: TicketStatus;

  @Column({ type: 'varchar', length: 50 })
  newStatus: TicketStatus;

  @ManyToOne(() => User, (user) => user.statusLog, {
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'changed_by' })
  changedBy: User;

  @CreateDateColumn({ name: 'changed_at', type: 'datetime2' })
  changedAt: Date;
}
