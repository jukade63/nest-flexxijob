import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { SkillLevel } from "../entities/skill.entity"
export class CreateSkillDto {
    @IsNotEmpty()
    skillName: string

    @IsEnum(SkillLevel)
    skillLevel: SkillLevel

    @IsOptional()
    certification: string

    @IsOptional()
    certLink: string

    @IsNotEmpty()
    userId: number
    
}
