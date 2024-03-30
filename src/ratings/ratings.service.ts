import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Repository } from 'typeorm';
import { Ratings } from './entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Ratings)
    private readonly ratingsRepository: Repository<Ratings>,
  ) {}
  async create(createRatingDto: CreateRatingDto) {
    return await this.ratingsRepository.save(createRatingDto);
  }


}
