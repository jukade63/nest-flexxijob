import { IsEmail, IsJWT, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
    
    @IsNotEmpty({ message: 'Email is required.' })
    @IsJWT({ message: 'Invalid token' })
    token: string;
}