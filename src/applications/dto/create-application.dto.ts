import { Worker } from "src/workers/entities/worker.entity";
import { ApplicationStatus } from "../entities/application.entity";

export class CreateApplicationDto {
    jobPostId: number
    status?: ApplicationStatus
}
