import { Applications } from 'src/applications/entities/application.entity';
import { AbstractEntity } from 'src/database/Abstract.entity';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Ratings } from 'src/ratings/entities/rating.entity';
import { Skills } from 'src/skills/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, } from 'typeorm';

@Entity()
export class Worker extends AbstractEntity<Worker> {
  
  @Column({ type: 'timestamptz', nullable: true })
  availableFrom: string;

  @Column({ type: 'timestamptz', nullable: true })
  availableTo: string;
  
  @OneToOne(() => User, {onDelete: 'CASCADE'})
  @JoinColumn()
  user: User;

  @OneToMany(() => Experience, (experience) => experience.worker)
  @JoinColumn()
  experiences: Experience[];
  
  @OneToMany(() => Skills, (skills) => skills.worker)
  @JoinColumn()
  skills: Skills[];
  
  @OneToMany(() => Education, (education) => education.worker)
  @JoinColumn()
  education: Education[];
  
  @OneToMany(() => Applications, (application) => application.worker)
  applications: Applications[];
  
  @ManyToMany(() => Jobs, {onDelete: 'CASCADE'})
  jobs: Jobs[];

  @OneToMany(() => Ratings, (rating) => rating.worker)
  ratings: Ratings[]
}

