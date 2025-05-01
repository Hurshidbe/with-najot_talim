import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  postID: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  text: string;

  @CreateDateColumn()
  postedAt: Date;

  @UpdateDateColumn()
  editedAt: Date;
}
