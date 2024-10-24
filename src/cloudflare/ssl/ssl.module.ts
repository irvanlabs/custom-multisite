import { Module } from '@nestjs/common';
import { SslController } from './ssl.controller';
import { SslService } from './ssl.service';

@Module({
  controllers: [SslController],
  providers: [SslService]
})
export class SslModule {}
