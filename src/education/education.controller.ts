import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/role/role.decorator';
import { UserType } from 'src/user/types/user-type';

@Controller('education')
@UseGuards(AuthGuard, RoleGuard)
@Role([UserType.Worker])
export class EducationController {

  constructor(
    private readonly educationService: EducationService,
  ) { }

  @Post()
  create(
    @Body() createEducationDto: CreateEducationDto
  ) {
    console.log({createEducationDto});
    
    return this.educationService.create(createEducationDto);
  }

  @Get(':userId')
  findByWorker(@Param('userId', ParseIntPipe) userId: number) {
    return this.educationService.findByWorker(userId);
  }

  @Get(':id/:userId')
  findOne(@Param('id', ParseIntPipe) id: number,
    @Param('workerId', ParseIntPipe) workerId: number) {
    return this.educationService.findOne(id, workerId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEducationDto: UpdateEducationDto
  ) {
    return this.educationService.update(id, updateEducationDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
   ) {
    return this.educationService.remove(id);
  }
}
