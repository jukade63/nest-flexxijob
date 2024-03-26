import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

export const ormConfigFactory = async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: +configService.getOrThrow('POSTGRES_PORT'),
    username: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    database: configService.getOrThrow('POSTGRES_DB'),
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.js'] 
} as TypeOrmModuleOptions )