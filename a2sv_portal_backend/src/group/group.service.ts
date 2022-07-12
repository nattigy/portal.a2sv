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

  findAll() {
    return this.prisma.group.findMany({});
  }

  findOne(id: string) {
    const group = this.prisma.group.findUnique({ where: { id: +id } });
    if (!group) {
      throw new HttpException(`Group #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return group;
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    const existingGroup = this.findOne(id);
    if (existingGroup) {
      return this.prisma.group.update({
        where: { id: +id },
        data: updateGroupDto,
      });
    }
  }

  remove(id: string) {
    return this.prisma.group.delete({ where: { id: +id } });
  }
}
