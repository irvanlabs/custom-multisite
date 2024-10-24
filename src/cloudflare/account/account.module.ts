import { Module } from '@nestjs/common';
import { CloudflareAccountController } from './account.controller';
import { CloudflareAccountService } from './account.service';

@Module({
    imports: [],
    controllers: [CloudflareAccountController],
    providers: [CloudflareAccountService]
})
export class CloudflareAccountModule {}
