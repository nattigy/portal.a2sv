import { Injectable, RequestTimeoutException } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async inviteMail(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: this.configService.get('PORTAL_EMAIL'),
        subject: 'Welcome to A2SV portal',
        // text:verifyEmailTemplate(email,code),
        template: 'emailEmail',
        context: {
          to: email,
          otpCode: code,
        },
      })
    } catch (e) {
      throw new RequestTimeoutException()
    }
  }

  async resetEmail(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: this.configService.get('PORTAL_EMAIL'),
        subject: 'Reset your password for A2SV portal',
        template: 'forgotEmail',
        context: {
          to: email,
          otpCode: code,
        },
      })
    } catch (e) {
      throw new RequestTimeoutException()
    }
  }
}
