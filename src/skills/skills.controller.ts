import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { UserType } from 'src/user/types/user-type';

@Controller('skills')
@UseGuards(AuthGuard, RoleGuard)
@Role([UserType.Worker])
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.skillsService.findByWorker(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number,
    @Param('workerId', ParseIntPipe) workerId: number
  ) {
    return this.skillsService.findOne(id, workerId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSkillDto: UpdateSkillDto
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.skillsService.remove(id);
  }
}
