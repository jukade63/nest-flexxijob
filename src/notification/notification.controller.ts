import { Body, Controller, Get, Patch, Request, UseGuards} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Notification } from './entities/notification.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAllByUser(@Request() req) {
    return this.notificationService.findAllByUser(req.user.sub);
  }

  @Patch()
  @UseGuards(AuthGuard)
  updateIsRead(
    @Request() req,
    @Body() body: Partial<Notification>
    ) {
    return this.notificationService.updateIsRead(req.user.sub, body);
  }
}
