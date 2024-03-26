import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Education, Worker]), UserModule],
  controllers: [EducationController],
  providers: [EducationService, UserService, UserRepository, CloudinaryService],
})
export class EducationModule {}
