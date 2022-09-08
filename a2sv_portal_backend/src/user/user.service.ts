import { Injectable, NotFoundException } from '@nestjs/common'
import { User, Prisma, Status, RoleEnum } from '@prisma/client'
import {} from '../user/entities/user.entity'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import * as bcrypt from 'bcrypt'
import { Parent } from '@nestjs/graphql'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'

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
      include: {
        group: true,
        userProfile: true,
        headToGroup: true,
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    status?: Status
    email?: string
    groupId?: number
    role?: RoleEnum
  }): Promise<User[] | []> {
    const { skip, take, status, email, groupId, role } = params

    const result = await this.prismaService.user.findMany({
      skip,
      take,
      where: {
        status,
        email,
        groupId,
        role,
      },
      include: {
        group: true,
        userProfile: true,
        headToGroup: true,
      },
    })

    return result
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      include: {
        group: true,
        userProfile: true,
        headToGroup: true,
      },
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

  async update(
    givenId: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const { id, groupId, userProfile, group, ...data } = updateUserInput

    const queryData = {
      ...data,
      userProfile: {
        connectOrCreate: {
          where: { userId: id },
          create: {
            ...userProfile,
          },
        },
      },
    } as unknown as Prisma.UserUpdateInput

    if (group) {
      queryData.group = {
        connect: { id: groupId || group.id },
      }
    }
    console.log(queryData)
    return await this.prismaService.user.update({
      include: {
        group: true,
        userProfile: true,
        headToGroup: true,
      },
      data: {
        ...queryData,
        userProfile: {
          upsert: {
            update: userProfile,
            create: userProfile,
          },
        },
      },
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
      include: {
        group: true,
        headToGroup: true,
        userProfile: true,
      },
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
