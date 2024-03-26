import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Business, User])],
  controllers: [BusinessesController],
  providers: [BusinessesService, UserService, UserRepository, CloudinaryService],
  exports: [BusinessesService],
})
export class BusinessesModule {}
