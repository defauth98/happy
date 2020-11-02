import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  passwordResetToken: string;

  @Column()
  passwordResetExpires: string;
}
