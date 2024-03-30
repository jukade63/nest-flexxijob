import { Controller, Post, Body} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JobsService } from 'src/jobs/jobs.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService,
    private readonly jobsService: JobsService
    ) {}

  @Post()
  async create(@Body() body: Record<string, any>) {
    const {jobId, workerId, content, value} = body
    const job = await this.jobsService.findOnedByWorkerId(jobId, workerId);
    return this.ratingsService.create({content, value, job});
  }

 
}
