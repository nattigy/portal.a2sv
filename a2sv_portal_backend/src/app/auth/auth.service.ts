import { Injectable, NotFoundException } from '@nestjs/common'
import { Context } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/user.service'
import { AuthResponse } from './dto/auth-response.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { StatusEnum } from '@prisma/client'
import GenerateOTP from '../../common/generat'
import { MailService } from '../../mail/mail.service'
import { User } from '../user/entities/user.entity'
import { ForgotResponse } from './dto/forgot-response'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user
    }
    return null
  }

  async forgotPassword(email: string): Promise<ForgotResponse> {
    const otpCode = GenerateOTP()

    const user = await this.usersService.user({ email })
    if (!user) {
      throw new NotFoundException('User not found!')
    }
    // if(user.status === StatusEnum.INACTIVE){
    //   throw new NotFoundException("User not active");
    // }
    const existingOtp = await this.prismaService.otp.findUnique({
      where: { email },
    })

    if (existingOtp) {
      const otpDate = new Date(existingOtp.updatedAt).getTime()
      const now = new Date().getTime()
      const dateDiff = (now - otpDate) / 1000 / 60
      if (dateDiff < 30) {
        return {
          message: `Retry After ${30 - dateDiff}minutes`,
          expireDateTime: expireDateTime(existingOtp.updatedAt, 30),
          sentOn: existingOtp.updatedAt,
        }
      }
    }
    const otp = await this.prismaService.otp.upsert({
      where: {
        email: user.email,
      },
      update: {
        code: otpCode,
        updatedAt: new Date(),
      },
      create: {
        email: user.email,
        code: otpCode,
        updatedAt: new Date(),
      },
    })
    await this.mailService.resetEmail(user.email, otpCode.toString())
    return {
      message: 'Email have been sent, verify the Code sent',
      expireDateTime: expireDateTime(otp.updatedAt, 3),
      sentOn: otp.updatedAt,
    } as ForgotResponse
  }

  async resetPassword(resetToken: string, pass: string) {
    const decoded = await this.jwtService.verify(resetToken)
    const email = decoded.email || ''
    if (email === '') {
      throw new NotFoundException('Invalid input!')
    }
    const user = this.prismaService.user.findUnique({ where: { email } })
    if (!user) {
      throw new NotFoundException('User not Found!')
    }
    const saltOrRounds = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass, saltOrRounds)
    await this.prismaService.user.update({
      where: { email },
      data: { password: hash },
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

  async signUp(email: string): Promise<string> {
    const otpCode = GenerateOTP().toString()
    const user = await this.usersService.createUser({ email, password: otpCode })
    await this.mailService.inviteMail(user.email, otpCode)
    return 'Short code has been sent to your email'
  }

  // async logout(@Context('res') response: Response) {
  //   response.cookie('Authentication', '', { httpOnly: true, expires: new Date() })
  // }

  async verifyOtp(@Context() context, otpCode: number, email: string): Promise<AuthResponse> {
    const otp = await this.prismaService.otp.findUnique({
      where: { email },
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
      where: { email },
    })
    if (!user) {
      throw new NotFoundException('User NOT found')
    }
    const now = new Date().getTime()
    const otpDate = new Date(otp.updatedAt).getTime()

    if ((now - otpDate) / 1000 / 60 > 30) {
      throw new NotFoundException('OTP expired!')
    }
    if (user.status === StatusEnum.INACTIVE) {
      throw new NotFoundException('User is not active!')
    }
    const accessToken = await this.setToken(context, user)
    return { accessToken, userId: user.id }
  }

  async resendOtp(email: string): Promise<ForgotResponse> {
    const otp = await this.prismaService.otp.findUnique({
      where: { email },
    })
    if (!otp) {
      throw new NotFoundException('Otp NOT found!')
    }

    const otpDate = new Date(otp.updatedAt).getTime()
    const now = new Date().getTime()

    const dateDiff = (now - otpDate) / 1000 / 60

    if ((now - otpDate) / 1000 / 60 > 3) {
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
      await this.mailService.resetEmail(otp.email, otpCode.toString())
      return {
        message: 'Code is sent to your  email',
        expireDateTime: expireDateTime(otp.updatedAt, 3),
        sentOn: new Date(otp.updatedAt),
      } as ForgotResponse
    }
    return {
      message: 'User your preveious code',
      expireDateTime: expireDateTime(otp.updatedAt, 3),
      sentOn: new Date(otp.updatedAt),
    } as ForgotResponse
  }

  async checkOtpStatus(email: string): Promise<Date> {
    const userOtp = await this.prismaService.otp.findUnique({ where: { email } })
    if (!userOtp) {
      throw new NotFoundException('Otp for the user does not exit!')
    }
    return userOtp.updatedAt
  }

  async changePassword(u: User, oldPass: string, newPass: string): Promise<string> {
    const email = u.email
    const user = await this.prismaService.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw new NotFoundException('User Not found with this email!')
    }
    if (bcrypt.compareSync(oldPass, user.password)) {
      const saltOrRounds = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(newPass, saltOrRounds)
      const updatedUser = await this.prismaService.user.update({
        where: {
          email,
        },
        data: {
          password: hash,
        },
      })
      if (!updatedUser) {
        throw new NotFoundException('Cannot change password!')
      }
      return 'Password changed.'
    }
  }
}

function expireDateTime(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}
