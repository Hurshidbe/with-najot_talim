import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'cats' })
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  laqab: string;
  @Column()
  zoti: string;
  @Column()
  narxi: number;
  @Column()
  tugulgan_sana: Date;
}
