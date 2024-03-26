import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadImage(data: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        try {
            const result = await cloudinary.uploader.upload(data, {folder: 'casualpro'});
            return result;
        } catch (error) {
            throw error
        }
    }
    async deleteImage(publicId: string): Promise<void> {
    
        await cloudinary.uploader.destroy(publicId);
      }
    
}
