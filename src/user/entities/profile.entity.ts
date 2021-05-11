import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true, length: 500 })
  bio: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({ nullable: true, type: 'date' })
  birthday: string;

  @Column({ nullable: true, unique: true })
  avatarURL: string;

  @Column({ nullable: true, length: 15, unique: true })
  tel: string;

  @Column({ nullable: true })
  city: string;
}
