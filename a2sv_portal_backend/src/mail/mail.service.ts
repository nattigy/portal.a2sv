import { Inject, Injectable } from '@nestjs/common';
import { CreateMailInput } from './dto/create-mail.input';
import { UpdateMailInput } from './dto/update-mail.input';
import { MailerService } from '@nestjs-modules/mailer';
import {resetPasswordEmailTemplate, verifyEmailTemplate } from './../common/email_templates';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async inviteMail(email:string,code:number){
    const mail = this.mailerService.sendMail({
      to: email,
      from:"riyad@a2sv.org",
      subject:"Welcome to A2SV portal",
      // text:verifyEmailTemplate(email,code),
      template:'emailEmail',
      context:{
        to:email,
        otpCode:code
      }
    })
    mail.then((value:any)=>{
      console.log(value)
    }).catch((reason:any)=>{
      console.log(reason);
    })
    return 0;
  }

  async resetEmail(email:string,code: number){
    const mail = this.mailerService.sendMail({
      to: email,
      from:"riyad@a2sv.org",
      subject:"Welcome to A2SV portal",
      template:'forgotEmail',
      context:{
        to:email,
        otpCode:code
      }
    })
    mail.then((value:any)=>{
      console.log(value)
    }).catch((reason:any)=>{
      console.log(reason);
    })
    return 0;
  }

}
