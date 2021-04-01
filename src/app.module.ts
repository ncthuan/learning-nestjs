import { Module} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule }  from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    UserModule, 
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: {
        cacheControl: false,
      }
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
