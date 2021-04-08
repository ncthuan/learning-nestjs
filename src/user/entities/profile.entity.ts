import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true, length: 500 })
  bio: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, type:'date' })
  birthday: string;

  @Column({ nullable: true, unique: true })
  avatarURL: string;
  
  @Column({ nullable: true, length: 15 })
  @Index({ unique: true })
  tel: string;

  @Column({ nullable: true })
  city: string;
}
