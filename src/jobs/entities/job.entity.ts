import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Ratings } from 'src/ratings/entities/rating.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Jobs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true, default: false})
  completed: boolean;

  @Column({nullable: true, default: false})
  isFavorite: boolean;

  @OneToOne(() => JobPost, (jobPost) => jobPost.job, {onDelete: 'CASCADE'})
  @JoinColumn()
  jobPost: JobPost;

  @OneToMany(() => Ratings, (rating) => rating.job)
  ratings: Ratings[];

  @ManyToMany(() => Worker, (worker) => worker.jobs, {cascade: true})
  @JoinTable()
  workers: Worker[]


}

