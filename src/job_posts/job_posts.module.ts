import { Module } from '@nestjs/common';
import { JobPostsService } from './job_posts.service';
import { JobPostsController } from './job_posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from './entities/job_post.entity';
import { Applications } from 'src/applications/entities/application.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { JobsService } from 'src/jobs/jobs.service';
import { Worker } from 'src/workers/entities/worker.entity';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost, Applications, Jobs, User, Worker])],
  controllers: [JobPostsController],
  providers: [JobPostsService, UserService, JobsService, UserRepository, CloudinaryService],
})
export class JobPostsModule { }
