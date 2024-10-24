import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";


enum ZoneType{
    PARTIAL = "partial",
    FULL = "full"
}

export class CreateZoneDTO{
    @IsString()
    @IsNotEmpty()
    domain_name:string;

    @IsEnum(ZoneType)
    @IsOptional()
    type?:ZoneType = ZoneType.FULL
}


