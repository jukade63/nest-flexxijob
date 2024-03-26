import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfigFactory } from 'config/jwt-config';
import { BusinessesService } from 'src/businesses/businesses.service';
import { WorkersService } from 'src/workers/workers.service';
import { Business } from 'src/businesses/entities/business.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Worker, Business]),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: jwtConfigFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserRepository, BusinessesService, WorkersService, EmailService],
  controllers: [AuthController],
})
export class AuthModule { }
