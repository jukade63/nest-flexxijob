import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly cloudinaryService: CloudinaryService,
        ) { }

    async createUser(userData: Partial<User>) {
        return await this.userRepository.saveUser(userData);
    }

    async getUserByWorkerId(workerId: number) {
        const user = await this.userRepository.getUserByWorkerId(workerId);
        if (!user) {
            throw new NotFoundException(`User with ID ${workerId} not found`);
        }
        return user
    }
  
    async getUserById(id: number) {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user
    }
    async updateUser(updateUserDto: UpdateUserDto) {

        const user = await this.userRepository.getUserById(updateUserDto.id);
        if (updateUserDto.imgUrl && updateUserDto.imgUrl !== user.imgUrl) {
          try {
            await this.cloudinaryService.deleteImage(user.publicId);
          } catch (error) {
            console.error('Failed to delete old image:', error.message);
          }
          try {
            const data = await this.cloudinaryService.uploadImage(updateUserDto.imgUrl);
    
            updateUserDto.imgUrl = data.secure_url
            updateUserDto.publicId = data.public_id
          } catch (error) {
            throw new Error('Failed to upload image')
          }
        }
        return await this.userRepository.saveUser({ ...user, ...updateUserDto });
      }
    

}
