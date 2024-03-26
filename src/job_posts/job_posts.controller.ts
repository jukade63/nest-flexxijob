import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, } from '@nestjs/common';
import { JobPostsService } from './job_posts.service';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { UpdateJobPostDto } from './dto/update-job_post.dto';
import { JobType } from './entities/job_post.entity';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserType } from 'src/user/types/user-type';

@Controller('job-posts')
export class JobPostsController {
  constructor(private readonly jobPostsService: JobPostsService) { }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Business])
  @Post()
  create(@Request() req, @Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostsService.create(req, createJobPostDto);
  }

  @Get()
  findAll(
    @Query('location') location: string,
    @Query('category') category: string,
    @Query('jobType') jobType: JobType,
    @Query('limit') limit: number = 5,
    @Query('start') start: number = 0
  ) {
    return this.jobPostsService.findAll(location, category, jobType, limit, start);
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Business])
  @Get('business')
  findAllByBusiness(@Request() req) {
    return this.jobPostsService.findAllByBusiness(req);
  }
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Worker])
  @Get('worker/all')
  findAllByWorker(@Request() req) {
    return this.jobPostsService.findAllByWorker(req);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobPostsService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Business])
  @Get('business/:id')
  findOneByBusiness(@Param('id', ParseIntPipe) id: number) {
    return this.jobPostsService.findOneByBusiness(id);
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Business])
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJobPostDto: UpdateJobPostDto) {
    return this.jobPostsService.update(id, updateJobPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobPostsService.remove(+id);
  }
}
