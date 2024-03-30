import { IsNotEmpty } from "class-validator"
import { Jobs } from "src/jobs/entities/job.entity"

export class CreateRatingDto {

    @IsNotEmpty()
    job: Jobs

    @IsNotEmpty()
    value: number

    @IsNotEmpty()
    content: string


}
