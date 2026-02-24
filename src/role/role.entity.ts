import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
export enum RoleType {
  MANAGER = 'MANAGER',
  SUPPORT = 'SUPPORT',
  USER = 'USER',
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: RoleType;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
