import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { CloudflareDnsService } from './dns.service';

@Controller('cf/dns')
export class CloudflareDnsController {
    constructor(
        private DnsService: CloudflareDnsService
    ){}

    @Get(':zone_id')
    async getZoneDNS(@Param('zone_id') zone_id: string): Promise<any> {
        if(!zone_id) throw new BadRequestException('zone id must be provided');
        return await this.DnsService.getZoneDns(zone_id)
    }

    @Get(':zone_id/detail/:dns_id')
    async getZoneDNSDetail(@Param('zone_id') zone_id: string, @Param('dns_id') dns_id: string): Promise<any> {
        if(!zone_id || !dns_id) throw new BadRequestException('Must specify zone id and dns_id');
        return await this.DnsService.getZoneDnsDetail(zone_id, dns_id)
    }

    @Get('/setting/:zone_id')
    async getZoneDNSSetting(@Param('zone_id') zone_id: string): Promise<any> {
        if(!zone_id) throw new BadRequestException('zone id must be provided');
        return await this.DnsService.getZoneDnsSettings(zone_id)
    }
}
