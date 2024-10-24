import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum DomainVerifiCationRequestMethodDTO{
    TXT = "txt",
    CNAME = "cname",
}
export class DomainVerifiCationRequestDTO{
    @IsNotEmpty()
    @IsString()
    domain_name:string;

    @IsNotEmpty()
    @IsEnum(DomainVerifiCationRequestMethodDTO)
    verification_type: DomainVerifiCationRequestMethodDTO
}


enum DnsProviderDTO{
    CLOUDFLARE = "cloudflare",
    DIGITALOCEAN = "digitalocean",
}

export class RegisterDomainDTO{
    @IsNotEmpty()
    @IsString()
    domain_name:string;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEnum(DnsProviderDTO)
    dns_provider:DnsProviderDTO = DnsProviderDTO.CLOUDFLARE;

    @IsNotEmpty()
    user_id:number;
}

