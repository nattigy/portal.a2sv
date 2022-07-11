import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
      },
    });

    return user;
  }
}
