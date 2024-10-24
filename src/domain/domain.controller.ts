import { Body, Controller, Get, Post } from '@nestjs/common';
import { DomainService } from './domain.service';
import { CreateZoneDTO } from 'src/cloudflare/zone/zone.dto';
import { DomainVerifiCationRequestDTO, RegisterDomainDTO } from './domain.dto';

@Controller('domain')
export class DomainController {
    constructor(
        private readonly domainService: DomainService
    ){}

    // @Post('cf/register')
    // async cfRegisterDomain(@Body() data: CreateZoneDTO){
    //     return await this.domainService.createCloudflareZone(data)
    // }
    
    // @Get('cf/verify')
    // async cfVerifyDomain(){
    //     return await this.domainService.domainVerification();
    // }

    @Post('register')
    async registerDomain(@Body() data: RegisterDomainDTO){
        return await this.domainService.registerDomain(data)
    }
}
