import { Ticket } from 'src/ticket/ticket.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ticket-comment')
export class TicketComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.comments)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
