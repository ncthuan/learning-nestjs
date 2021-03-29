import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Index, BeforeInsert } from 'typeorm';
import { Profile } from './profile.entity';
//import * as argon2 from 'argon2';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  //@Index({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await argon2.hash(this.password);
  // }

  @JoinColumn()
  @OneToOne(type => Profile, {
    eager: false,
    cascade: true,
    onDelete: "SET NULL",
    nullable: true
  })
  profile: Profile;
}
