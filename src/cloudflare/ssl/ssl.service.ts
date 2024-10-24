import { Injectable } from '@nestjs/common';
import { cf } from 'src/config/cloudflare.config';

@Injectable()
export class SslService {
    private cloudflare = cf;

    async getAutoSSl(): Promise<any>{
        // let status = await this.cloudflare.ssl.verification({zone})
    }
}
