import { PartialType } from '@nestjs/mapped-types';
import { CreateJobPostDto } from './create-job_post.dto';
import { Jobs } from 'src/jobs/entities/job.entity';

export class UpdateJobPostDto extends PartialType(CreateJobPostDto) {
    job: Jobs
}
