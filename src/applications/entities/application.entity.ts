import { AbstractEntity } from 'src/database/Abstract.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';


export enum ApplicationStatus {
  Applied = 'applied',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

@Entity()
export class Applications extends AbstractEntity<Applications> {

  @CreateDateColumn({ type: 'timestamptz' })
  appliedAt: Date;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.Applied })
  status: ApplicationStatus;

  @ManyToOne(() => Worker, (worker) => worker.applications, { onDelete: 'CASCADE' })
  worker: Worker;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.applications, { onDelete: 'CASCADE' })
  jobPost: JobPost;

}

