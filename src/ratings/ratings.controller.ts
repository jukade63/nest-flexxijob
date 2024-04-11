import { Controller, Post, Body, Get, Param, UseGuards, Request, Query, ParseIntPipe } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JobsService } from 'src/jobs/jobs.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { WorkersService } from 'src/workers/workers.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService,
    private readonly workerService: WorkersService
  ) { }

  @Post()
  async create(@Body() body: CreateRatingDto) {

    return this.ratingsService.create(body);
  }

  @Get('worker/:workerId/job/:jobId')
  getOneByWorkerId(
    @Param('workerId') workerId: number,
    @Param('jobId') jobId: number) {
    return this.ratingsService.getOneByWorkerId(workerId, jobId)
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllByWorkerId(
    @Request() req,
    @Query('workerId') workerId?: string
  ) {
    if (workerId) {
      return this.ratingsService.getAllByWorkerId(+workerId)
    }
    const userId = req.user.sub
    const worker = await this.workerService.getWorkerByUserId(userId)
    return this.ratingsService.getAllByWorkerId(worker.id)
  }

}
