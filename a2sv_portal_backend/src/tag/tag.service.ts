import { Injectable } from '@nestjs/common'
import { Tag } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { CreateTagInput } from './dto/create-tag.input'
import { UpdateTagInput } from './dto/update-tag.input'

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagInput: CreateTagInput): Promise<Tag> {
    return this.prismaService.tag.create({ data: createTagInput })
  }

  async findAll(filter?: any): Promise<Tag[]> {
    return this.prismaService.tag.findMany({
      ...filter,
      include: {
        problems: true,
      },
    })
  }

  async findById(id: string): Promise<Tag> {
    return this.prismaService.tag.findUnique({
      where: { id },
      include: { problems: true },
    })
  }

  async update(id: string, updateTagInput: UpdateTagInput): Promise<Tag> {
    return this.prismaService.tag.update({
      where: { id },
      data: updateTagInput,
      include: {
        problems: true,
      },
    })
  }

  async remove(id: string): Promise<Tag | null> {
    return this.prismaService.tag.delete({ where: { id } })
  }

  async findOne(filter?: any): Promise<Tag | null> {
    return this.prismaService.tag.findFirst({
      where: filter,
      include: {
        problems: true,
      },
    })
  }
}
