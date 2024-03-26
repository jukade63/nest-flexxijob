import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { EducationService } from 'src/education/education.service';
import { ExperienceService } from 'src/experience/experience.service';
import { SkillsService } from 'src/skills/skills.service';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Skills } from 'src/skills/entities/skill.entity';
import { Worker } from 'src/workers/entities/worker.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Business, Education, Experience, Skills, Worker])],
  controllers: [UserController],
  providers: [UserService, UserRepository, CloudinaryService, EducationService, ExperienceService, SkillsService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
