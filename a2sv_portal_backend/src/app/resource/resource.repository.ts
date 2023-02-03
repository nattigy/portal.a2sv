import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { Resource } from './entities/resource.entity'

@Injectable()
export class ResourceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data:Prisma.ResourceCreateInput): Promise<Resource> {
    return this.prismaService.resource.create({ data })
  }

  async count(where?: Prisma.ResourceWhereInput): Promise<number> {
    return this.prismaService.resource.count({ where })
  }

  async findAll(params:{
    skip?: number
    take?:number
    where?: Prisma.ResourceWhereInput
    orderBy?: Prisma.ResourceOrderByWithRelationInput
  }): Promise<Resource[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.resource.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        topic: true,
      },
    })
  }

 

  async findOne(where: Prisma.ResourceWhereInput) {
    return this.prismaService.resource.findFirst({
      where,
      include: {
        topic: true,
      },
    })
  }
  async update(params:{
    where: Prisma.ResourceWhereUniqueInput
    data: Prisma.ResourceUpdateInput
  }): Promise<Resource> {
    const { where, data } = params
    return this.prismaService.resource.update({
        data,
      where,
      
      include: {
        topic: true,
      },
    })
  }

  async remove(where: Prisma.ResourceWhereUniqueInput){
    return this.prismaService.resource.delete({ where })
  }
}
