import { AbstractEntity } from 'src/database/Abstract.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';


@Entity()
export class Experience extends AbstractEntity<Experience> {

  @Column()
  position: string;

  @Column()
  company: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => Worker, (worker) => worker.experiences, {onDelete: 'CASCADE'})
  worker: Worker;
}

