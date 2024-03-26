import { AbstractEntity } from 'src/database/Abstract.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

export enum SkillLevel {
  BEGINNER = 'Basic',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}
@Entity()
export class Skills extends AbstractEntity<Skills> {

  @Column()
  skillName: string;

  @Column({nullable: true})
  skillLevel: SkillLevel;

  @Column({nullable: true})
  certification: string;

  @Column({ nullable: true })
  certLink: string;

  @ManyToOne(() => Worker, (worker) => worker.skills, {onDelete: 'CASCADE'})
  worker: Worker;
}

