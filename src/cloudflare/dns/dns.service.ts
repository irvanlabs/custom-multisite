import { HttpException, Injectable } from '@nestjs/common';
import { RecordsV4PagePaginationArray } from 'cloudflare/resources/dns/records';
import { cf } from 'src/config/cloudflare.config';

@Injectable()
export class CloudflareDnsService {
    private cloudflare = cf;

    async getZoneDns(zone_id:string): Promise<any> {
        let dns: RecordsV4PagePaginationArray
        try{
            dns = await this.cloudflare.dns.records.list({zone_id: zone_id});
        }catch(err){
            throw new HttpException(err.error, err.status);
        }

        return dns.result
    }

    async getZoneDnsDetail(zone_id:string, dns_id: string ): Promise<any> {
        let dns
        try{
            dns = await this.cloudflare.dns.records.get(dns_id, {zone_id: zone_id})
        }catch(err){
            throw new HttpException(err.error, err.status);
        }

        return dns
    }

    async getZoneDnsSettings(zone_id: string): Promise<any>{
        let dns
        try{
            dns = await this.cloudflare.dns.settings.get({zone_id: zone_id})
        }catch(err){
            throw new HttpException(err.error, err.status);
        }

        return dns
    }
    
}
