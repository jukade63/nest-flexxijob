import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean, IsDateString, IsArray, IsOptional } from 'class-validator';
import { JobType, Status } from '../entities/job_post.entity'; 
import { Business } from 'src/businesses/entities/business.entity';

export class CreateJobPostDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  requirements: string[];

  @IsArray()
  @IsNotEmpty()
  location: string[];

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsEnum(JobType)
  @IsNotEmpty()
  jobType: JobType;

  @IsNumber()
  @IsNotEmpty()
  paymentAmount: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsOptional()
  available: boolean;

  @IsEnum(Status)
  @IsOptional()
  status: Status;
}

