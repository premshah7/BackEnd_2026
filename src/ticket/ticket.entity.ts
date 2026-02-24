import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketComment } from 'src/ticket-comment/ticket-comment.entity';
import { TicketStatusLog } from 'src/status-log/status-log.entity';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLSOED = 'CLSOED',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  desccription: string;

  @Column({ default: TicketStatus.OPEN })
  status: TicketStatus;

  @Column({ default: Priority.MEDIUM })
  priority: Priority;

  @ManyToOne(() => User, (user) => user.createdTickets, { nullable: false })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assginedTickets)
  assignedTo: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => TicketComment, (comment) => comment.ticket)
  comments: TicketComment[];

  @OneToMany(() => TicketStatusLog, (log) => log.ticket)
  statusLog: TicketStatusLog[];
}
