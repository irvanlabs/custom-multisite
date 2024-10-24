import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Zone, ZonesV4PagePaginationArray } from 'cloudflare/resources/zones/zones';
import { cf } from 'src/config/cloudflare.config';
import { CreateZoneDTO } from './zone.dto';

@Injectable()
export class CloudflareZoneService {
    private cloudflare = cf;

    async getAllZones(): Promise<Zone>{
        let zone
        try {
            zone = await this.cloudflare.zones.list();
        } catch (err) {
            throw new HttpException(err.error, err.status);
        }
        return zone
    }

    async getZone(zoneId: string): Promise<Zone>{
        let zone
        try{
            zone = await this.cloudflare.zones.get({zone_id: zoneId})
        } catch (err) {
            throw new HttpException(err.error, err.status);
        }
        return zone
    }

    async getZoneActivation(zoneId: string): Promise<any>{
        let zone
        try{
            zone = await this.cloudflare.zones.activationCheck.trigger({zone_id: zoneId})
        } catch (err) {
            throw new HttpException(err.error, err.status);
        }
        return zone
    }

    async createZone(data:CreateZoneDTO): Promise<Zone>{
        let result
        let  account_id = process.env.CLOUDFLARE_ACCOUNT_ID
        try {
            result = await this.cloudflare.zones.create({
                account: {
                    id: account_id
                }, 
                name: data.domain_name, 
                type: data.type
            })
        } catch (error) {
            throw new HttpException(error.messages, error.status);

        }
        return result;
    }



    // async getZoneSettings(zoneId: string): Promise<any>{
    //     let zone
    //     try{
    //         zone = await this.cloudflare.zones.settings.get('dns', {zone_id: zoneId})
    //     } catch(err) {
    //         Logger.error(err);
    //         throw new Error(err);
    //     }
    //     return zone
    // }
}
