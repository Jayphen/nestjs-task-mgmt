import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(
    () => User,
    user => user.tasks,
    { eager: false },
  )
  user: User;
}
