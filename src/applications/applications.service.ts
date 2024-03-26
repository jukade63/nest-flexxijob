import { BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Applications } from './entities/application.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ApplicationsService {

  constructor(
    @InjectRepository(Applications)
    private readonly applicationsRepository: Repository<Applications>,
    private userRepository: UserRepository,
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(Jobs)
    private jobsRepository: Repository<Jobs>,

  ) { }

  async create(userId: number, jobPostId: number) {
    
    const worker = await this.workerRepository.findOne({where: { user: { id: userId } } })
    const existingApplication = await this.applicationsRepository.findOne({
      where:
      {
        jobPost: { id: jobPostId }, worker: { id: worker.id }
      }
    })
    if (existingApplication) {
      throw new ConflictException(`Duplicate application`);
    }
    const application = this.applicationsRepository.create({
      worker,
      jobPost: {
        id: jobPostId
      }
    })

    const job = await this.jobsRepository.findOneBy({ jobPost: { id: jobPostId } })

    await job.addWorker(worker)

    return await this.applicationsRepository.save(application)

  }

  async findAllByWorker(req) {
    const { sub } = req.user
    try {
      const worker = await this.workerRepository.findOne({
        where: { user: { id: sub } },
      })
      const applications = await this.applicationsRepository.find({
        where: {
          worker: { id: worker.id },
        },
        relations: ['jobPost', 'jobPost.business', 'jobPost.business.user'],
        order: { appliedAt: 'DESC' },
      });
      return applications
    } catch (error) {
      throw error
    }

  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    const application = this.applicationsRepository.findOne({
      where: { id },
      relations: ['worker',]
    });
    if (!application) {
      throw new Error(`Application with id ${id} not found`);
    }
    return application
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.findOne(id)
    return await this.applicationsRepository.save({ ...application, ...updateApplicationDto })
  }

  async remove(id: number) {
    const application = await this.applicationsRepository.findOne({
      where: { id },
    })

    const jobPost = await this.jobPostRepository.findOne({
      where: { applications: {id: application.id} },
    })
    
    const currentDate = new Date();
    const startDate = new Date(jobPost.startDate);
    const oneWeekLater = new Date();
    oneWeekLater.setDate(currentDate.getDate() + 7);

    if (application.status === 'accepted') {
      throw new BadRequestException('Application cannot be deleted as it has been accepted');
      
    }
    
    if ((currentDate <= startDate) && (startDate <= oneWeekLater)) {
      throw new BadRequestException('Application cannot be deleted as the start date is within 1 week');
    }
    return await this.applicationsRepository.delete({ id })

  }
}
