import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type SendEmailDto = {
    subject: string
    template: string
    email: string
    name: string
    activationLink: string
}

@Injectable()
export class EmailService {
    constructor(
        private mailService: MailerService
    ) { }

    async sendEmail({ subject, template, email, name, activationLink }: SendEmailDto) {
        {
            await this.mailService.sendMail({
                to: email,
                subject,
                template,
                context: {
                    name,
                    activationLink
                }
            });
        }
    }
}
