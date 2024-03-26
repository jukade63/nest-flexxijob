import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserType } from 'src/user/types/user-type';

@UseGuards(AuthGuard, RoleGuard)
@Role([UserType.Worker])
@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  create(
    @Body() createExperienceDto: CreateExperienceDto
    ) {
    return this.experienceService.create(createExperienceDto);
  }

  @Get(':userId')
  findAllByWorker(@Param('userId', ParseIntPipe) userId: number) {
    return this.experienceService.findByWorker(userId);
  }

  @Get(':id/:workerId')
  findOne(@Param('id', ParseIntPipe) id: number,
  @Param('workerId', ParseIntPipe) workerId: number) {
    return this.experienceService.findOne(id, workerId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExperienceDto: UpdateExperienceDto
  ) {
    return this.experienceService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number) {
    return this.experienceService.remove(id);
  }
}
