import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { CloudflareZoneModule } from 'src/cloudflare/zone/zone.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CloudflareZoneModule, HttpModule],
  controllers: [DomainController],
  providers: [DomainService]
})
export class DomainModule {}
