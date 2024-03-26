import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfigFactory } from 'config/orm-config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            // useFactory: ormConfigFactory
            useFactory: async (config: ConfigService) => ({
                ...(await config.get('database'))
            })
        })
    ]
})
export class DatabaseModule {}