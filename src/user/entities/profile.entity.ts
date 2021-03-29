import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // @Index({ unique: true })
  // username: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  gender: boolean;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  avatar: string;



}
