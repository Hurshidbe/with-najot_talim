import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ default: 'user', nullable: true })
  full_name: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ enum: ['user', 'admin'], default: 'user' })
  role: string;
  @CreateDateColumn()
  createdAt: Date;
}
