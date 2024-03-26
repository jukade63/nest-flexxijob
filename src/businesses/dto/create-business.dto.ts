import { IsNotEmpty } from "class-validator"


export class CreateBusinessDto {
    @IsNotEmpty()
    industry: string

    @IsNotEmpty()
    description: string
}
