import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EducationService } from 'src/education/education.service';
import { ExperienceService } from 'src/experience/experience.service';
import { SkillsService } from 'src/skills/skills.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { UserType } from './types/user-type';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly educationService: EducationService,
    private readonly experienceService: ExperienceService,
    private readonly skillsService: SkillsService
    
    ) { }
  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserType.Worker])
  async getAllProfileData(@Request() req) {

    const {user:{sub}} = req
    const user = await this.userService.getUserById(sub);
    const education = await this.educationService.findByWorker(sub);
    const experiences = await this.experienceService.findByWorker(sub);
    const skills = await this.skillsService.findByWorker(sub);
    return {user, education, experiences, skills}
  }

}
