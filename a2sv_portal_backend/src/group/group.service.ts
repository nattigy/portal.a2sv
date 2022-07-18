import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { isInt } from '../utils';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({ data: createGroupDto });
  }

  findAllBatches() {
    return this.prisma.group.findMany({ where: { parentId: null } });
  }

  findAllInBatches(id: number) {
    return this.prisma.group.findMany({ where: { parentId: +id } });
  }

  findAll() {
    return this.prisma.group.findMany({});
  }

  findOne(id: number) {
    const group = this.prisma.group.findUnique({ where: { id: +id } });
    if (!group) {
      throw new HttpException(`Group #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return group;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    const existingGroup = this.findOne(id);
    if (existingGroup) {
      return this.prisma.group.update({
        where: { id: +id },
        data: updateGroupDto,
      });
    }
  }

  async remove(id: number) {
    const existingGroup = this.findOne(id);
    if (existingGroup) {
      return await this.prisma.group.delete({ where: { id: +id } });
    }
  }
}
