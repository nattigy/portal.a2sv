import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { User } from './entities/user.entity'
import { UserProfileIncludeObject } from '../user-profile/user-profile.repository'

export const UserIncludeObject = {
  group: true,
  headToGroup: true,
  userProfile: { include: UserProfileIncludeObject },
}

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
      include: UserIncludeObject,
    })
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.prismaService.user.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.user.findMany({
      skip,
      take,
      where,
      orderBy,
      include: UserIncludeObject,
    })
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.findUnique({
      where,
      include: UserIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prismaService.user.update({
      data,
      where,
      include: UserIncludeObject,
    })
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.delete({ where })
  }
}
