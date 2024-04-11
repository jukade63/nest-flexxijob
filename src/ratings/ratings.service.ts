import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ratings } from './entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Ratings)
    private readonly ratingsRepository: Repository<Ratings>,
  ) { }
  async create(body: Record<string, any>) {

    return await this.ratingsRepository.save({...body, job: {id: body.jobId}, worker: {id: body.workerId}});
  }

  async getOneByWorkerId(workerId: number, jobId: number) {

    const rating = await this.ratingsRepository.findOne({ where: { job: { id: jobId,}, worker: { id: workerId } } })
    if(!rating){
      throw new NotFoundException('rating not found')
    }
    return rating
  }

  async getAllByWorkerId(workerId: number) {

    const ratings = await this.ratingsRepository.find({ where: { worker: { id: workerId } } })
    if(!ratings){
      throw new NotFoundException('ratings not found')
    }
    return ratings
  }


}
