import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Index,
  BeforeInsert,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Profile } from './profile.entity';
import * as argon2 from 'argon2';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Profile, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  profile: Profile;
}
