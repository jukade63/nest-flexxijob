import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from 'src/experience/entities/experience.entity';
import { Skills } from 'src/skills/entities/skill.entity';
import { Education } from 'src/education/entities/education.entity';
import { Worker } from './entities/worker.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Worker, Experience, Skills, Education])],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
