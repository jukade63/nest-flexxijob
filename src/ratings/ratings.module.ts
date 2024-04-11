import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ratings } from './entities/rating.entity';
import { JobsService } from 'src/jobs/jobs.service';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { User } from 'src/user/entities/user.entity';
import { WorkersService } from 'src/workers/workers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ratings, Jobs, Worker, JobPost, User])],
  controllers: [RatingsController],
  providers: [RatingsService, JobsService, UserService, UserRepository, CloudinaryService, WorkersService],
})
export class RatingsModule {}
