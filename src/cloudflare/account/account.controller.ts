import { Controller, Get } from '@nestjs/common';
import { CloudflareAccountService } from './account.service';

@Controller('cf/account')
export class CloudflareAccountController {
    constructor(
        private readonly accountService: CloudflareAccountService
    ){}

    @Get('list')
    async getAccounts(): Promise<any>{
        return await this.accountService.getListAccounts();
    }
}
