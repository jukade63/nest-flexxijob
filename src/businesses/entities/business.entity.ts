import { AbstractEntity } from 'src/database/Abstract.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Business extends AbstractEntity<Business> {
  
  @OneToOne(() => User, (user) => user.business, {onDelete:'SET NULL'})
  @JoinColumn()
  user: User;

  @Column({nullable: true})
  industry: string;

  @Column({nullable: true})
  description: string;

  @OneToMany(() => JobPost, (jobPost) => jobPost.business)
  jobPosts: JobPost[];
}

