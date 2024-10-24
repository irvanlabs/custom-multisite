import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpCode, HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateZoneDTO } from 'src/cloudflare/zone/zone.dto';
import { CloudflareZoneService } from 'src/cloudflare/zone/zone.service';
import { parseDnsRecord } from '@layered/dns-records';
import { PrismaClient, Site, VerificationType } from '@prisma/client';
import {_} from 'lodash';
import { generateCname, generateTxt } from 'src/common/generator.common';
import { DomainVerifiCationRequestDTO, RegisterDomainDTO } from './domain.dto';
import { parse } from 'psl'
import { HttpStatusCode } from 'axios';

@Injectable()
export class DomainService {
    constructor(
        private readonly CloudflareZoneService: CloudflareZoneService,
        private httpService: HttpService,
    ){}
    private prisma: PrismaClient  = new PrismaClient()


    async createCloudflareZone(data: CreateZoneDTO): Promise<any>{
        try {
            let result = await this.CloudflareZoneService.createZone(data)

            return {
                domain_name: result.name,
                name_server: result.name_servers,
                previous_nameserver:result.original_name_servers,
                dns_host: result.original_dnshost,
                registrar: result.original_registrar
            }
        } catch (error) {
            throw new HttpException(error.messages, error.status);
        }

    }

    private getTxtValue(data): string | null {
        let app_name = process.env.APP_NAME || 'App'
        for (const record of data) {
            const regex = new RegExp(`${app_name.toLowerCase()}-site-verification=([0-9]+)`);  // Dinamis regex berdasarkan env variable
            const match = record.data.match(regex);
            if (match) {
                return match[1];
            }
        }
        return null;
    }

    async requestDomainVerification(data: DomainVerifiCationRequestDTO ){
    
    }

    async domainVerification(site_id: number = 1){
        let site = await this.prisma.siteVerification.findUnique({
            where: {
                id: site_id
            }
        })

        if(site.type === VerificationType.TXT){
            const txtRecords = await firstValueFrom(this.httpService.get(`https://cloudflare-dns.com/dns-query?name=ariq.my.id&type=TXT`, { headers: {Accept: 'application/dns-json'}}));
            let txtValue = this.getTxtValue(txtRecords.data.Answer)

            if(txtValue !== site.value){
                return false
            }
        }
    }

    async registerDomain(data: RegisterDomainDTO){
        const parseResult:DomainInfo= parse(data.domain_name)
        if(parseResult.error){
            throw new BadRequestException(parseResult.error.message)
        }else if(!parseResult.subdomain){
            throw new BadRequestException("Must provide a subdomain");
        }
        try {
            let provider = await this.prisma.provider.findFirstOrThrow({
                where: {
                    name: _.capitalize(data.dns_provider)
                }
            })
            let site = await this.prisma.site.create({
                data: {
                    name: data.name,
                    domain: parseResult.input,
                    tld: parseResult.tld,
                    userId: data.user_id,
                    providerId: provider.id,
                }
            })
            return site
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

interface DomainInfo {
    input: string;
    tld: string;
    sld: string;
    domain: string;
    subdomain: string | null;
    listed: boolean;
    error?: any
}