import { Module } from '@nestjs/common';
import { CloudflareZoneController } from './zone.controller';
import { CloudflareZoneService } from './zone.service';

@Module({
  controllers: [CloudflareZoneController],
  providers: [CloudflareZoneService],
  exports: [CloudflareZoneService]
})
export class CloudflareZoneModule {}
