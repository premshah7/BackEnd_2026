import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/role/role.entity';
import { TicketComment } from 'src/ticket-comment/ticket-comment.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketStatusLog } from 'src/status-log/status-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.createdBy)
  createdTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignedTo)
  assginedTickets: Ticket[];

  @OneToMany(() => TicketComment, (comment) => comment.user)
  comments: TicketComment[];

  @OneToMany(() => TicketStatusLog, (log) => log.changedBy)
  statusLog: TicketStatusLog[];
}
