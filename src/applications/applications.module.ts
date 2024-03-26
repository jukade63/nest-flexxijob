import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Applications } from './entities/application.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/entities/notification.entity';
import { JobPostsService } from 'src/job_posts/job_posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Applications, User, Worker, JobPost, Jobs, Notification])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, UserService, JobPostsService, UserRepository, CloudinaryService, NotificationService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
