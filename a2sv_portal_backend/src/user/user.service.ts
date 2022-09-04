import { Injectable, NotFoundException } from '@nestjs/common'
import { User, Prisma, Status } from '@prisma/client'
import {} from '../user/entities/user.entity'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import * as bcrypt from 'bcrypt'
import { Parent } from '@nestjs/graphql'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput

    const foundUser = await this.prismaService.user.findFirst({
      where: { email },
    })

    if (foundUser) throw new Error('Email is already in use')

    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    return this.prismaService.user.create({
      data: {
        email,
        password: hash,
        status: Status.ACTIVE,
        role: createUserInput.role,
        updatedAt: new Date().toISOString(),
      },
    })
  }

  findAll(params: {
    skip?: number
    take?: number
    where?: any
  }): Promise<User[] | []> {
    const { skip, take, where } = params
    return this.prismaService.user.findMany({
      skip,
      take,
      where,
    })
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async getRole(@Parent() user: User) {
    return this.prismaService.role.findFirst({ where: { id: 1 } })
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return await this.prismaService.user.update({
      data: updateUserInput,
      where: { id },
    })
  }

  async remove(id: number): Promise<User | null> {
    return await this.prismaService.user.delete({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: { email },
    })
  }

  async findById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    })
  }
}
