import { Jobs } from 'src/jobs/entities/job.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Ratings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Jobs, (job) => job.ratings, {onDelete: 'SET NULL'})
  @JoinColumn()
  job: Jobs;

  @Column({ type: 'decimal' })
  rating_value: number;

  @Column('text')
  content: string;
}

