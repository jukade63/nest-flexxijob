import { AbstractEntity } from "src/database/Abstract.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Notification extends AbstractEntity<Notification> {
    @Column()
    message: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    read: boolean

    @ManyToOne(() => User, (user) => user.notifications, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({referencedColumnName: 'id'})
    to: User
}