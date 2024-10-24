import { Module } from '@nestjs/common';
import { CloudflareZoneModule } from './zone/zone.module';
import { CloudflareDnsModule } from './dns/dns.module';
import { SslModule } from './ssl/ssl.module';
import { CloudflareAccountModule } from './account/account.module';

@Module({
  imports: [CloudflareZoneModule, CloudflareDnsModule, SslModule, CloudflareAccountModule]
})
export class CloudflareModule {}
