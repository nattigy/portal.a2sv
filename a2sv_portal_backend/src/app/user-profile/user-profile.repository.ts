import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserProfile } from './entities/user-profile.entity'

export const UserProfileIncludeObject = { user: true }

@Injectable()
export class UserProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserProfileCreateInput): Promise<UserProfile> {
    return this.prismaService.userProfile.create({
      data,
      include: UserProfileIncludeObject,
    })
  }

  async count(where?: Prisma.UserProfileWhereInput): Promise<number> {
    return this.prismaService.user.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserProfileWhereInput
    orderBy?: Prisma.UserProfileOrderByWithRelationInput
  }): Promise<UserProfile[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userProfile.findMany({
      skip,
      take,
      where,
      orderBy,
      include: UserProfileIncludeObject,
    })
  }

  async findOne(where: Prisma.UserProfileWhereUniqueInput): Promise<UserProfile> {
    return this.prismaService.userProfile.findUnique({
      where,
      include: UserProfileIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.UserProfileWhereUniqueInput
    data: Prisma.UserProfileUpdateInput
  }): Promise<UserProfile> {
    const { where, data } = params
    return this.prismaService.userProfile.update({
      data,
      where,
      include: UserProfileIncludeObject,
    })
  }

  async remove(where: Prisma.UserProfileWhereUniqueInput) {
    return this.prismaService.userProfile.delete({ where })
  }
}
