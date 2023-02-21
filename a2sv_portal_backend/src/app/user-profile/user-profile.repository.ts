import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserProfile } from './entities/user-profile.entity'

@Injectable()
export class UserProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserProfileCreateInput): Promise<UserProfile> {
    return this.prismaService.userProfile.create({
      data,
      include: { user: true, userProfileAddress: true },
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
      include: { user: true, userProfileAddress: true },
    })
  }

  async findOne(where: Prisma.UserProfileWhereUniqueInput): Promise<UserProfile> {
    return this.prismaService.userProfile.findUnique({
      where,
      include: { user: true, userProfileAddress: true },
    })
  }

  async update(params: {
    where: Prisma.UserProfileWhereUniqueInput
    data: Prisma.UserProfileUpdateInput
  }): Promise<UserProfile> {
    const { where, data } = params
    console.log(where, data, 'user profile check')
    const ans = await this.prismaService.userProfile.update({
      data,
      where: { userId: '8dbbc720-7f58-4a48-8bd0-d9a40c06f65e' },
      include: { user: true, userProfileAddress: true },
    })
    console.log(ans, 'after')
    return ans
  }

  async remove(where: Prisma.UserProfileWhereUniqueInput) {
    return this.prismaService.userProfile.delete({ where })
  }
}
