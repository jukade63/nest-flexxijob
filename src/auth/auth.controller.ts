import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserType } from 'src/user/types/user-type';
import { BusinessesService } from "src/businesses/businesses.service";
import { WorkersService } from "src/workers/workers.service";
import { RefreshGuard } from './refresh.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateBusinessDto } from 'src/businesses/dto/create-business.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly businessService: BusinessesService,
        private readonly workerService: WorkersService,

    ) { }

    @Post('login')
    login(@Body() body: Partial<CreateUserDto>) {
        return this.authService.login(body)
    }

    @Post('register')
    async register(@Body() body: Partial<CreateUserDto>) {
        const {id: userId, userType} = await this.authService.register(body)
        if (userType === UserType.Business) {
        const {industry, description} = body as CreateBusinessDto
            await this.businessService.create({userId, industry, description});
        } else {
            await this.workerService.create(userId);
        }
        return 'user registered'
    }

    @Post('activate-account')
    activateAccount(@Body('token') token: string) {
        return this.authService.activateAccount(token)
        
    }

    @Post('refresh')
    @UseGuards(RefreshGuard)
    refresh(@Request() req) {

        return this.authService.refreshToken(req.user)
    }

    @Post('forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto.email)

    }

    @Patch('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto)
    }



}
