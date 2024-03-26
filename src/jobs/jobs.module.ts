import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobs } from './entities/job.entity';
import { Ratings } from 'src/ratings/entities/rating.entity';
import { Applications } from 'src/applications/entities/application.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs, Ratings, JobPost, Applications, Worker]), UserModule],
  controllers: [JobsController],
  providers: [JobsService, UserService, UserRepository, CloudinaryService],
})
export class JobsModule { }
