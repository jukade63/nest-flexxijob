import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    async saveUser(userData: Partial<User>): Promise<User> {
        return await this.userRepository.save(userData);
    }
    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }
    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }
    async updateUser(userId: number, userData: Partial<User>) {
        return await this.userRepository.update(userId, userData);
    }
    async getUserByWorkerId(workerId: number): Promise<User> {
        return await this.userRepository.findOne({ where: { worker : { id: workerId } } });
    }

}
