import { Injectable, NotFoundException } from '@nestjs/common'
import { Context } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'
import { User } from 'src/app/user/entities/user.entity'
import { CreateUserInput } from '../user/dto/create-user.input'
import { UserService } from '../user/user.service'
import { AuthResponse } from './dto/auth-response.dto'

import { PrismaService } from 'src/prisma/prisma.service';
import { StatusEnum } from '@prisma/client';
import GenerateOTP from '../../common/generat';
import { MailService } from '../../mail/mail.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({where: {email} })
    // const saltOrRounds = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(pass, saltOrRounds)
    console.log(bcrypt.compareSync(pass, user.password));
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null
  }

  async forgotPassword(email: string): Promise<string | null> {
    const otpCode = GenerateOTP()

    const user = await this.usersService.user({ email })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    // if(user.status === StatusEnum.INACTIVE){
    //   throw new NotFoundException("User not active");
    // }
    await this.prismaService.otp.upsert({
      where: {
        email: user.email,
      },
      update: {
        code: otpCode,
        updatedAt: new Date()
      },
      create: {
        email: user.email,
        code: otpCode,
        updatedAt: new Date()
      },
  
    })

    await this.mailService.resetEmail(user.email, otpCode)
    return 'Rest Code Sent'
  }

  async resetPassword(resetToken: string, pass: string) {
    const decoded = await this.jwtService.verify(resetToken)
    const email = decoded.email || ''
    if (email === '') {
      throw new NotFoundException('Incorrect Hash')
    }
    const user = this.prismaService.user.findUnique({ where: { email } })
    if (!user) {
      throw new NotFoundException('User not Found')
    }
    const saltOrRounds = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, saltOrRounds)
    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        password: hash,
      },
    })
    // redirect it to login page
    return 'Password Reset Complete!'
  }

  async getUser(id: string): Promise<User | null> {
    const user = await this.usersService.user({ id })
    if (user) {
      return user
    }
    return null
  }

  async setToken(context, user): Promise<string> {
    const payload = { email: user.email, sub: user.id }
    const accessToken = this.jwtService.sign(payload)
    const expires = new Date()
    expires.setHours(expires.getHours() + 120)
    context.res.cookie('Authentication', accessToken, { httpOnly: true, expires })
    return accessToken
  }

  async login(@Context() context): Promise<AuthResponse> {
    const user = context.req.user
    const accessToken = await this.setToken(context, user)
    return { accessToken, userId: user.id }
  }

  async signUp(createUserInput: CreateUserInput): Promise<string> {
    const user = await this.usersService.createUser(createUserInput)
    const otpCode = GenerateOTP()

    await this.prismaService.otp.upsert({
      where: {
        email: user.email,
      },
      update: {
        code: otpCode,
      },
      create: {
        email: user.email,
        code: otpCode,
      },
    })
    await this.mailService.inviteMail(user.email, otpCode)
    // redirect to verify page
    return 'Short code has been sent to your email'
  }

  async logout(@Context('res') response: Response) {
    response.cookie('Authentication', '', { httpOnly: true, expires: new Date() })
  }

  async verifyOtp(@Context() context, otpCode: number, email: string): Promise<AuthResponse> {
    const otp = await this.prismaService.otp.findUnique({
      where: {
        email,
      },
    })
    if (!otp) {
      throw new NotFoundException('Otp NOT found')
    }
    if (otpCode !== otp.code) {
      throw new NotFoundException('Incorrect Otp Code')
    }
    if (email !== otp.email) {
      throw new NotFoundException('Incorrect Otp Code for the email')
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })
    if(!user){
      throw new NotFoundException('User NOT found');
    }
    const now = new Date().getTime()
    const otpDate = new Date(otp.updatedAt).getTime()

    if ( (((now -otpDate)/1000)/ 60) > 30) {
      console.log(now - otpDate)
      throw new NotFoundException('OTP expired')
    }
    if (user.status === StatusEnum.INACTIVE) {
      throw new NotFoundException('User is not active')
    }
    const accessToken = await this.setToken(context, user)
    return { accessToken, userId: user.id }
  }



  async resendOtp(email:string):Promise<string>{
    const otp = await this.prismaService.otp.findUnique({
      where: {
        email,
      },
    })
    if (!otp) {
      throw new NotFoundException('Otp NOT found')
    }

    const otpDate = new Date(otp.updatedAt).getTime();
    const now = (new Date().getTime())

    const dateDiff = ((now -otpDate)/1000)/ 60;

    if(  (((now -otpDate)/1000)/ 60) > 3){
      const otpCode = GenerateOTP()
      await this.prismaService.otp.upsert({
        where: {
          email: otp.email,
        },
        update: {
          code: otpCode,
        },
        create: {
          email: otp.email,
          code: otpCode,
        },
      })
      this.mailService.resetEmail(otp.email,otpCode);
    return 'OTP resented';
    }
    return dateDiff.toString();
  }
}
