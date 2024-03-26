import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
import { Worker } from 'src/workers/entities/worker.entity';

@Injectable()
export class ExperienceService {

  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) { }

  private async getWorker(userId: number) {
    const worker = await this.workerRepository.findOne({ where: { user: { id: userId } } });
    if (!worker) {
      throw new NotFoundException(`worker not found`);
    }
    return worker
  }
  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const worker = await this.getWorker(createExperienceDto.userId)
    const newExperience = this.experienceRepository.create({
      ...createExperienceDto,
      worker
    });
    return await this.experienceRepository.save(newExperience);
  }
  async findByWorker(userId: number) {
    const worker = await this.getWorker(userId)
    return await this.experienceRepository.find({
      where: { worker: { id: worker.id } },
    });
  }

  async findOne(id: number, workerId: number) {
    return await this.experienceRepository.findOne({ where: { id, worker: { id: workerId } } })
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.experienceRepository.findOne({ where: { id } });

    if (!experience) {
      throw new BadRequestException('Bad Request');
    }

    const updatedExperience = { ...experience, ...updateExperienceDto };
    return await this.experienceRepository.save(updatedExperience);

  }

  async remove(id: number) {
    const experience = await this.experienceRepository.findOne({ where: { id } });

    if (!experience) {
      throw new BadRequestException('Bad Request');
    }

    await this.experienceRepository.remove(experience);

    return { message: 'Experience record removed successfully' };
  }
}
