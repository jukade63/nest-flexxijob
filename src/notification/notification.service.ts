import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
    ) { }
    async create(notification: Partial<Notification>) {
        const existingNot = await this.notificationRepository.findOne({ where: { to: { id: notification.to.id }, message: notification.message } });
        if (!existingNot) return await this.notificationRepository.save(notification);
    }
    async findAllByUser(userId: number) {
        return await this.notificationRepository.find({
            where: {
                to: {
                    id: userId
                }
            },
            order: {
                createdAt: 'DESC'
            },
            take: 10
        });
    }
    async updateIsRead(userId: number, body: Partial<Notification>) {
        const { id } = body
        const notification = await this.notificationRepository.findOne({ where: { id, to: { id: userId } } });
        notification.read = true;
        return await this.notificationRepository.save(notification);
    }
}
