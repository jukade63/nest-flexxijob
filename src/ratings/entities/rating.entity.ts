import { AbstractEntity } from 'src/database/Abstract.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Ratings extends AbstractEntity<Ratings> {

  @ManyToOne(() => Jobs, (job) => job.ratings, {onDelete: 'SET NULL'})
  @JoinColumn()
  job: Jobs;

  @Column({ type: 'decimal' })
  value: number;

  @Column('text')
  content: string;
}

