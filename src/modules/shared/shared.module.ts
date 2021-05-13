import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';

const providers = [ConfigService];

@Module({
  imports: [],
  providers: providers,
  exports: providers,
})
export class SharedModule {}