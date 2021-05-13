import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserService } from '../user/user.service';
import { User, Profile } from '../../database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [AdminController],
  providers: [UserService],
})
export class AdminModule {}
