import { HttpException, Injectable } from '@nestjs/common';
import { cf } from 'src/config/cloudflare.config';

@Injectable()
export class CloudflareAccountService {
    private cloudflare = cf

    async getListAccounts(): Promise<any>{
        let result
        try {
            result = await this.cloudflare.accounts.list();
            console.log(result);
        } catch (error) {
            throw new HttpException(error.error, error.status);
        }
        return result.result;
    }
}
