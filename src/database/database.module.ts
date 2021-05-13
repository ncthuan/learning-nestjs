import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/modules/shared/services/config.service';
import { SharedModule } from 'src/modules/shared/shared.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.dbConfig.host,
        port: configService.dbConfig.port,
        username: configService.dbConfig.user,
        password: configService.dbConfig.pass,
        database: configService.dbConfig.name,
        entities: [__dirname + '/entities/*.entity.{ts,js}'],
        logging: configService.dbConfig.log,
        synchronize: true,
        migrationsRun: true,
        migrationsTransactionMode: 'each',
        migrations: [__dirname + '/migrations/*.{ts,js}'],
      }),
    }),
  ],
})
export class DatabaseModule {}
