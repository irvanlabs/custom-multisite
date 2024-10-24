import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudflareModule } from './cloudflare/cloudflare.module';
import { DigitalOceanModule } from './digital-ocean/digital-ocean.module';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    CloudflareModule, 
    DigitalOceanModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), DomainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
