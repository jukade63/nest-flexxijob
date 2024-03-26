import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Applications } from "./entities/application.entity";
import { Worker } from "src/workers/entities/worker.entity";

export class ApplicationRepository {
    constructor(
        @InjectRepository(Applications)
        private readonly applicationsRepository: Repository<Applications>
    ){}

    async findByJobPostIdAndWorkerId(jobPostId: number, workerId: number) {
        return await this.applicationsRepository.findOneBy({ jobPost: { id: jobPostId }, worker: { id: workerId }  as Worker })
    }
}