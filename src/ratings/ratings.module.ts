import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ratings } from './entities/rating.entity';
import { JobsService } from 'src/jobs/jobs.service';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ratings, Jobs, Worker, JobPost])],
  controllers: [RatingsController],
  providers: [RatingsService, JobsService],
})
export class RatingsModule {}
