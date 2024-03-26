import { ConfigService } from '@nestjs/config';

export const jwtConfigFactory = async (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') },
});
