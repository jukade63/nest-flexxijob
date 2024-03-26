import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Experience, Worker]), UserModule],
  controllers: [ExperienceController],
  providers: [ExperienceService, UserService, UserRepository, CloudinaryService],
})
export class ExperienceModule {}
