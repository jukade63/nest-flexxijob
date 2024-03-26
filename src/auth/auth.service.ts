import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { UserRepository } from "src/user/user.repository";
import * as bcrypt from 'bcryptjs';
import { ConfigService } from "@nestjs/config";
import { EmailService } from "src/email/email.service";
import { template } from "handlebars";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly emailService: EmailService
    ) { }



    async login(auth: Partial<User>) {
        const user = await this.validateUser(auth.email);
        if (!user) {
            throw new NotFoundException('Credentials incorrect');
        }
        if (!user.isVerified) {
            throw new BadRequestException('Please activate your account');
        }
        const pwMatches = await this.validatePassword(auth.password, user.password);
        if (!pwMatches) {
            throw new NotFoundException('Credentials incorrect');
        }

        const payload = { sub: user.id, email: user.email };
        delete user.password
        return {
            user,
            accessToken: await this.generateToken(payload, this.configService.get('JWT_SECRET'), '5m'),
            refreshToken: await this.generateToken(payload, this.configService.get('REFRESH_TOKEN_SECRET'), '7d'),
            expiresIn: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        }
    }
    async register(userData: Partial<User>): Promise<User> {
        const existingUser = await this.validateUser(userData.email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }
        const { password, ...rest } = userData;
        const hash = await bcrypt.hash(password, 10);

        const user = await this.userRepository.saveUser({ ...rest, password: hash });

        const activationCode = await this.generateToken({ sub: user.id }, this.configService.get('ACTIVATION_TOKEN_SECRET'), '15m');

        await this.emailService.sendEmail({
            email: rest.email,
            subject: 'Activate your account',
            template: 'activate-account',
            name: rest.username,
            activationLink: this.configService.get('CLIENT_URL') + '/activate-account?token=' + activationCode
        })

        return user
    }

    async activateAccount(token: string) {
        if (!token) {
            throw new BadRequestException('Invalid token');
        }
        const user = await this.validateToken(token, this.configService.get('ACTIVATION_TOKEN_SECRET'));
        if (!user) {
            throw new BadRequestException('Invalid token');
        }
        if (user.isVerified) {
            throw new BadRequestException('Account already activated');
        }
        console.log('user', user);
        
        const updatedUser = await this.userRepository.updateUser(user.id, { isVerified: true });
        
        return { message: 'Account activated successfully' };
    }

    async refreshToken(user: any) {
        const payload = { sub: user.sub, email: user.email };
        return {
            accessToken: await this.generateToken(payload, this.configService.get('JWT_SECRET'), '5m'),
            refreshToken: await this.generateToken(payload, this.configService.get('REFRESH_TOKEN_SECRET'), '7d'),
            expiresIn: new Date(Date.now() + 5 * 60 * 1000),
        }
    }

    async forgotPassword(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const token = await this.generateToken({ sub: user.id }, this.configService.get('FORGOT_PASS_SECRET'), '15m');

        const resetPassUrl = this.configService.get('CLIENT_URL') + '/reset-password?token=' + token;

        await this.emailService.sendEmail({
            email,
            subject: 'Reset your password',
            template: 'forgot-password',
            name: user.username,
            activationLink: resetPassUrl
        })

        return { message: 'Email sent, check your inbox' }

    }

    async resetPassword(dto: ResetPasswordDto) {
        const { token, password } = dto;
        const user = await this.validateToken(token, this.configService.get('FORGOT_PASS_SECRET'));
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const hash = await bcrypt.hash(password, 10);
        await this.userRepository.updateUser(user.id, { password: hash });
        return { message: 'Password reset successfully' };
    }

    private validatePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
    private async generateToken(payload: Record<string, any>, secret: string, expiresIn: string) {
        return await this.jwtService.signAsync(payload, { secret, expiresIn })
    }
    private async validateUser(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);

    }
    private async validateToken(token: string, secret: string): Promise<User | null> {
        try {
            const decodedToken = await this.jwtService.verifyAsync(token, { secret });
            if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
                throw new BadRequestException('Invalid token');
            }

            const user = await this.userRepository.getUserById(decodedToken.sub);
            return user;
        } catch (error) {
            return null;
        }
    }

}

