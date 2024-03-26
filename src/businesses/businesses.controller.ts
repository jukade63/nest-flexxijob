import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserType } from 'src/user/types/user-type';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';

@Controller('business')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Get()
  findAll() {
    return this.businessesService.findAll();
  }

  @Get('me')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Business])
  getMe(@Request() req) {
    return this.businessesService.findOne(req.user.sub);
  }


  @Patch(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Business])
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessesService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessesService.remove(+id);
  }
}
