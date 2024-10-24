import { Module } from '@nestjs/common';
import { CloudflareDnsController } from './dns.controller';
import { CloudflareDnsService } from './dns.service';

@Module({
  providers: [CloudflareDnsService],
  controllers: [CloudflareDnsController]
})
export class CloudflareDnsModule {}
