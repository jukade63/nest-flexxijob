import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Request } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { UserType } from 'src/user/types/user-type';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }


  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserType.Worker])
  @Get('favorites')
  findFavorites(@Request() req) {
    return this.jobsService.findFavorites(req.user.sub);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserType.Worker])
  @Get('completed')
  getCompletedJobs(@Request() req) {
    return this.jobsService.getCompletedJobs(req.user.sub);
  }

  @Patch(':jobId')
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserType.Worker])
  update(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() updateJobDto: UpdateJobDto) {

    return this.jobsService.updateJob(jobId, updateJobDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
