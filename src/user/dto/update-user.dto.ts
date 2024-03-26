import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserType } from "../types/user-type";

export class UpdateUserDto {
    @IsOptional()
    readonly id?: number;
  
    @IsOptional()
    @IsString()
    readonly username?: string;
  
    @IsOptional()
    @IsString()
    readonly password?: string;
  
    @IsOptional()
    @IsEmail()
    readonly email?: string;
  
    @IsOptional()
    @IsEnum(UserType)
    readonly userType?: UserType;
  
    @IsOptional()
    @IsString()
    readonly phoneNumber?: string;
  
    @IsOptional()
    @IsString()
    imgUrl?: string;
  
    @IsOptional()
    @IsString()
    publicId?: string;
  }