import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserType } from 'src/user/types/user-type';
import { NotificationService } from 'src/notification/notification.service';
import { JobPostsService } from 'src/job_posts/job_posts.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private notificationService: NotificationService,
    private readonly applicationsService: ApplicationsService,
    private readonly jobPostService: JobPostsService,
    private userService: UserService

  ) { }

  @Post(':jobPostId')
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserType.Worker])
  async create(@Request() req,
    @Param('jobPostId', ParseIntPipe) jobPostId: number
  ) {    
    const application = await this.applicationsService.create(req.user.sub, jobPostId);
    
    const jobPost = await this.jobPostService.findOne(jobPostId)   
    const {business: {user}} = jobPost
     
    await this.notificationService.create({
      message: `new application on your job post ${jobPost.title}`,
      read: false,
      to: new User(user),
    })
    return application
  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Worker])
  @Get('worker/all')
  findAllByWorker(@Request() req) {
    return this.applicationsService.findAllByWorker(req);

  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateApplicationDto: UpdateApplicationDto) {
    
    const application = await this.applicationsService.update(id, updateApplicationDto);
    const jobPost = await this.jobPostService.findOneByApplicationId(application.id)
    const user = await this.userService.getUserByWorkerId(application.worker.id)
    
    await this.notificationService.create({
      message: `new update on your application on job post ${jobPost.title}`,
      read: false,
      to: user
    })
    return application
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserType.Worker])
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number
    ) {
    return this.applicationsService.remove(id);
  }
}
