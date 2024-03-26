import { IsString, IsEmail, IsEnum, IsOptional, IsInt } from 'class-validator';
import { UserType } from '../types/user-type';


export class CreateUserDto {
  @IsOptional()
  @IsInt()
  readonly id: number;
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(UserType)
  readonly userType: UserType;

  @IsString()
  readonly phoneNumber: string;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsString()
  publicId?: string;
}