import { AbstractEntity } from 'src/database/Abstract.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Ratings extends AbstractEntity<Ratings> {

  @ManyToOne(() => Jobs, (job) => job.ratings, {onDelete: 'SET NULL'})
  @JoinColumn()
  job: Jobs;

  @ManyToOne(() => Worker, (worker) => worker.ratings, {onDelete: 'SET NULL'})
  @JoinColumn()
  worker: Worker;

  @Column({type: 'int'})
  value: number;

  @Column('text')
  content: string;
}

