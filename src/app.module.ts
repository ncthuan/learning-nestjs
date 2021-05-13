import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './modules/shared/shared.module';
// import { Connection } from 'typeorm';

@Module({
  imports: [
    // eslint-disable-next-line prettier/prettier
    SharedModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
    UserModule,
  ],
})
export class AppModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
