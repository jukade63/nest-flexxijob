import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from './entities/skill.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { Worker } from 'src/workers/entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skills, Worker]),UserModule],
  controllers: [SkillsController],
  providers: [SkillsService,UserService, UserRepository, CloudinaryService],
})
export class SkillsModule {}
