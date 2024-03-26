import { Applications } from 'src/applications/entities/application.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { AbstractEntity } from 'src/database/Abstract.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Entity, Column,ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

export enum JobType {
  Casual = 'casual',
  PartTime = 'part-time',
  Temporary = 'temporary',
}

export enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity()
export class JobPost extends AbstractEntity<JobPost> {

  @ManyToOne(() => Business, (business) => business.jobPosts, {onDelete: 'CASCADE'})
  @JoinColumn()
  business: Business;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('varchar', {array: true})
  requirements: string[];

  @Column('varchar', {array: true})
  location: string[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  startDate: Date; 

  @Column({ type: 'timestamptz' })
  endDate: Date; 

  @Column({ type: 'enum', enum: JobType })
  jobType: JobType;

  @Column({ type: 'decimal' })
  paymentAmount: number;

  @Column()
  category: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'enum', enum: Status, default: Status.Pending })
  status: Status;

  @OneToMany(() => Applications, (application) => application.jobPost)
  @JoinColumn()
  applications: Applications[];

  @OneToOne(() => Jobs)
  @JoinColumn()
  job: Jobs
  
}
