import { Controller, Get, Param } from '@nestjs/common';
import { CloudflareZoneService } from './zone.service';

@Controller('/cf/zone')
export class CloudflareZoneController {
    constructor(
        private zoneService: CloudflareZoneService
    ){}

    @Get(':id')
    async getZone(@Param('id') zone_id: string): Promise<any> {
        return await this.zoneService.getZone(zone_id);
    }

    @Get('all')
    async getAllZones(): Promise<any>{
        return await this.zoneService.getAllZones();
    }

    @Get('activation/:id')
    async getZoneActivationCheck(@Param('id') zone_id: string): Promise<any> {
        return await this.zoneService.getZoneActivation(zone_id);
    }

    // @Get('setting/:id')
    // async getZoneSetting(@Param('id') zone_id: string){
    //     return await this.zoneService.getZoneSettings(zone_id)
    // }
}
