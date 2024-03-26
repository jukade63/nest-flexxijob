import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from './entities/worker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkersService {

  constructor(
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
    ) {}
  async create(userId: number) {
    return await this.workerRepository.save({ user: { id: userId }})
  }

  findAll() {
    return `This action returns all workers`;
  }

  async findOneByUserId (userId: number): Promise<Worker> {
    return await this.workerRepository.findOne({
      where: { user: { id: userId }},
    })

  }

  async findOne(id: number): Promise<Worker> {
    const worker = await this.workerRepository.findOne({
      where: { id },
      relations: ['user', 'experiences', 'education', 'skills'],
    });
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found.`);
    }

    return worker;
  }
 
  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
