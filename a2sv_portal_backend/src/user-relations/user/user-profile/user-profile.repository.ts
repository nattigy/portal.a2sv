import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserProfileCreateInput) {
    return this.prismaService.userProfile.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserProfileWhereInput
    orderBy?: Prisma.UserProfileOrderByWithRelationInput
  }) {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userProfile.findMany({
      skip,
      take,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.UserProfileWhereUniqueInput) {
    return this.prismaService.userProfile.findUnique({ where })
  }

  async update(params: {
    where: Prisma.UserProfileWhereUniqueInput
    data: Prisma.UserProfileUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.userProfile.update({ data, where })
  }

  async remove(where: Prisma.UserProfileWhereUniqueInput) {
    return this.prismaService.userProfile.delete({ where })
  }
}
