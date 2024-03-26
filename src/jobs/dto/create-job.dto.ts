import { Ratings } from "src/ratings/entities/rating.entity"
import { Jobs } from "../entities/job.entity"
import { Worker } from "src/workers/entities/worker.entity"
import { JobPost } from "src/job_posts/entities/job_post.entity"

export class CreateJobDto {
    completed?: boolean
    jobPost: JobPost
    isFavorite?: boolean
}
