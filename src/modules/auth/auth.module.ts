import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from 'src/modules/shared/services/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // eslint-disable-next-line prettier/prettier
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtConfig.accessTokenSecret,
        signOptions: {
          expiresIn: configService.jwtConfig.accessTokenExpireTime,
        },
      }),
    }),
  ],
  providers: [ConfigService, AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
