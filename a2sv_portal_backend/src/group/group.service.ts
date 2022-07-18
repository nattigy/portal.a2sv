import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({ data: createGroupDto });
  }

  findAllBatches(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.group.findMany({
      where: { parentId: null },
      skip: offset,
      take: limit,
    });
  }

  findAllInBatches(id: number) {
    return this.prisma.group.findMany({ where: { parentId: +id } });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.group.findMany({
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number) {
    const group = this.prisma.group.findUnique({ where: { id: +id } });
    if (!group) {
      throw new NotFoundException(`Group #${id} not found`);
    }

    return group;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    this.findOne(id);

    return this.prisma.group.update({
      where: { id: +id },
      data: updateGroupDto,
    });
  }

  async remove(id: number) {
    this.findOne(id);

    return await this.prisma.group.delete({ where: { id: +id } });
  }
}
