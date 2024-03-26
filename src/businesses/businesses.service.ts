import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ){}
  async create(dto: Record<string, any>) {
    const business = this.businessRepository.create({
      ...dto,
      user: { id: dto.userId }
    });
    await this.businessRepository.save(business);
  }

  findAll() {
    return `This action returns all businesses`;
  }

  async findOne(userId: number) {
    const business = await this.businessRepository.findOne({ where: { user: { id: userId } } });
    if(!business) throw new NotFoundException();
    return business;
  }

  async update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return await this.businessRepository.update({ id }, updateBusinessDto);
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
