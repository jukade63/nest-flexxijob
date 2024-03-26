import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skills } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { Worker } from 'src/workers/entities/worker.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    private readonly skillsRepository: Repository<Skills>, 
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
  async create(createSkillDto: CreateSkillDto) : Promise<Skills> {
   const worker = await this.getWorker(createSkillDto.userId)
    const skill = this.skillsRepository.create({
      ...createSkillDto,
      worker
    });
    return await this.skillsRepository.save(skill);
  }

  async findByWorker(userId: number) {
    const  worker = await this.getWorker(userId)
    return await this.skillsRepository.find({ where: { worker: { id: worker.id } } })
  }

  async findOne(id: number, workerId: number) {
    return await this.skillsRepository.findOne({ where: { id, worker: { id: workerId } } })
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {

    const skill = await this.skillsRepository.findOne({ where: { id } });

    if (!skill) {
      throw new BadRequestException('Bad Request');
    }
    const updated = { ...skill, ...updateSkillDto };
    return await this.skillsRepository.save(updated);
  }

  async remove(id: number) {
    const education = await this.skillsRepository.findOne({ where: { id } });

    if (!education) {
      throw new BadRequestException('Bad Request');
    }

    await this.skillsRepository.remove(education);

    return { message: 'Education record removed successfully' };
  }
}
