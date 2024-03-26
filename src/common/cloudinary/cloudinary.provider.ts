import { ConfigOptions, v2 } from 'cloudinary';
import { FactoryProvider } from '@nestjs/common';

export const CloudinaryProvider: FactoryProvider<ConfigOptions> = {
    provide: 'Cloudinary',
    useFactory: (): ConfigOptions => {
        return v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        });
    }
};
