import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Mail } from './entities/mail.entity';

@Resolver(() => Mail)
export class MailResolver {
  constructor() {}

  // @Query(() => Mail)
  // sendmail(){
  //   const mail = this.mailerService.sendMail({
  //     to:"riyadworku@gmail.com",
  //     from:"riyad@a2sv.org",
  //     subject:"Welcome to A2SV portal",
  //     template:emailInviteTemplate("riyadworku@gmail.com"),
  //   })
  //   mail.then((value:any)=>{
  //     console.log(value)
  //   }).catch((reason:any)=>{
  //     console.log(reason);
  //   })
  //   console.log(mail);
  //   return 0;
  // }
}
