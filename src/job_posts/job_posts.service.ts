import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jobs } from 'src/jobs/entities/job.entity';
import { JobPost, JobType, Status } from './entities/job_post.entity';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { UpdateJobPostDto } from './dto/update-job_post.dto';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class JobPostsService {

  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepository: Repository<JobPost>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Jobs)
    private readonly jobsRepository: Repository<Jobs>,
  ) { }

  private async getUserById(id: number, relations?: string[]) {
    const user = await this.userRepository.findOne({ where: { id }, relations })
    if (!user) throw new NotFoundException('user not found')
    return user
  }
  async create(req, createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    const { sub } = req.user
    const user = await this.userRepository.findOne({ where: { id: sub }, relations: ['business'] })
    if (!user) throw new NotFoundException('user not found')

    const jobPost = await this.jobPostRepository.save({ ...createJobPostDto, business: user.business, status: Status.Approved });

    const job = await this.jobsRepository.save({
      jobPost: jobPost,
    })
    await this.jobPostRepository.update({ id: jobPost.id }, { job: job })
    return jobPost
  }

  async findAll(location?: string, category?: string, jobType?: JobType, limit?: number, start?: number) {

    let query = this.jobPostRepository.createQueryBuilder('jobPost')
      .where('jobPost.status = :status', { status: Status.Approved })
      .andWhere('jobPost.startDate > :currentDate', { currentDate: new Date() })

    if (location) {
      query = query.andWhere('EXISTS (SELECT 1 FROM UNNEST(jobPost.location) AS loc WHERE loc ILIKE :location)', { location: `%${location}%` });
    }
    if (category) {
      query = query.andWhere('jobPost.category ILIKE :category', { category: `%${category}%` });
    }
    if (jobType) {
      query = query.andWhere('jobPost.jobType = :jobType', { jobType: jobType });
    }
    query = query.leftJoinAndSelect('jobPost.business', 'business')
      .leftJoinAndSelect('business.user', 'user')
      .select(['jobPost', 'business', 'user.username', 'user.phoneNumber', 'user.email', 'user.imgUrl'])
      .orderBy('jobPost.createdAt', 'DESC');

    if (start !== undefined && limit !== undefined) {
      query = query.skip(start).take(limit);
    }

    return query.getMany();
  }

  async findOne(id: number) {
    const jobPost = await this.jobPostRepository.findOne({
      where: { id },
      relations: ['business', 'business.user', 'job']
    })
    if (!jobPost) throw new NotFoundException('job post not found')
    return jobPost
  }

  async findOneByApplicationId(id: number) {
    
    const jobPost = await this.jobPostRepository.findOne({ where: { applications: { id: id } }, relations: ['business', 'business.user',] },)
    if (!jobPost) throw new BadRequestException('Bad Request')
    return jobPost
  }

  async findOneByBusiness(id: number) {
    return await this.jobPostRepository
      .createQueryBuilder('jobPost')
      .where('jobPost.id = :id', { id })
      .leftJoinAndSelect('jobPost.applications', 'applications')
      .leftJoinAndSelect('applications.worker', 'worker')
      .leftJoinAndSelect('worker.user', 'user')
      .leftJoinAndSelect('worker.education', 'education')
      .leftJoinAndSelect('worker.experiences', 'experiences')
      .leftJoinAndSelect('worker.skills', 'skills')
      .getOne();
  }

  async findAllByBusiness(req) {
    try {
      const { sub: userId } = req.user;
      const user = await this.getUserById(userId, ['business']);

      return await this.jobPostRepository.find({
        where: { business: { id: user.business.id } },
        relations: ['applications', 'job', 'applications.worker.user'],
      })
    } catch (error) {
      throw new Error(`Error fetching job posts by business: ${error.message}`);
    }
  }
  async findAllByWorker(req) {
    try {
      const { sub: userId } = req.user;
      const user = await this.getUserById(userId);

      return await this.jobPostRepository.find({
        where: {
          applications: {
            worker: { user: { id: user.id } }
          }
        },
        relations: ['job', 'business.user'],
        select: ['id', 'title', 'paymentAmount', 'startDate', 'endDate'],
      })
    } catch (error) {
      throw new Error(`Error fetching job posts by worker: ${error.message}`);
    }
  }

  async update(id: number, updateJobPostDto: UpdateJobPostDto) {

    const jobPost = await this.jobPostRepository.findOneBy({ id });
    if (!jobPost) {
      return new NotFoundException('job post not found')
    }
    return await this.jobPostRepository.save({ ...jobPost, ...updateJobPostDto });

  }

  remove(id: number) {
    return `This action removes a #${id} jobPost`;
  }
}
