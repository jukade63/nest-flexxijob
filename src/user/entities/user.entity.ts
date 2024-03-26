import { Entity, Column, OneToOne, OneToMany} from 'typeorm';
import { Exclude } from '@nestjs/class-transformer';
import { UserType } from '../types/user-type';
import { Business } from 'src/businesses/entities/business.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { AbstractEntity } from 'src/database/Abstract.entity';
import { Notification } from 'src/notification/entities/notification.entity';


@Entity()
export class User extends AbstractEntity<User>{

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserType, })
  userType: UserType;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({ nullable: true })
  publicId?: string;

  @OneToOne(() => Business, business => business.user)
  business: Business;

  @OneToOne(() => Worker, worker => worker.user)
  worker: Worker;

  @Column({ nullable: true })
  isVerified?: boolean

  @OneToMany(() => Notification, notification => notification.to)
  notifications?: string[]

}