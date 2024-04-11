import { IsNotEmpty } from "class-validator"

export class CreateRatingDto {

    @IsNotEmpty()
    jobId: number

    @IsNotEmpty()
    workerId: number

    @IsNotEmpty()
    value: number

    @IsNotEmpty()
    content: string


}
