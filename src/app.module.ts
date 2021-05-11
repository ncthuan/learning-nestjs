import { Module} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { TypeOrmModule }  from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigService } from './config.service';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, AdminModule],
  controllers: [AuthController, UserController, AdminController],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
