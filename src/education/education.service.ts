import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from 'src/workers/entities/worker.entity';

@Injectable()
export class EducationService {

  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) { }
  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    
    const worker = await this.workerRepository.findOne({ where: { user: {id: createEducationDto.userId} } });
    
    if (!worker) {
      throw new NotFoundException(`wprker not found`);
      
    }
    const newEducation = this.educationRepository.create({
      ...createEducationDto,
      worker
    });
    return await this.educationRepository.save(newEducation);
  }

  async findByWorker(userId: number) {
    const worker = await this.workerRepository.findOne({ where: { user: {id: userId} } });
    if (!worker) {
      throw new NotFoundException(`No worker found for ID ${userId}`);
    }
    return await this.educationRepository.find({
      where: { worker: { id: worker.id } },
    });
  }


  async findOne(id: number, workerId: number) {
    return await this.educationRepository.findOne({ where: { id, worker: { id: workerId } } })
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    const education = await this.educationRepository.findOne({ where: { id } });
    if (!education) {
      throw new BadRequestException("Bad Request");
    }
    const updatedEducation = { ...education, ...updateEducationDto };
    return await this.educationRepository.save(updatedEducation);

  }

  async remove(id: number) {

    const education = await this.educationRepository.findOne({ where: { id } });
    await this.educationRepository.remove(education);

    return { message: 'Education record removed successfully' };
  }
}
