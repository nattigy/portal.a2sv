import { NotFoundException, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  create(createTopicDto: CreateTopicDto) {
    return this.prisma.topic.create({ data: createTopicDto });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.topic.findMany({
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number) {
    const topic = this.prisma.topic.findUnique({ where: { id: +id } });
    if (!topic) {
      throw new NotFoundException(`Topic #${id} not found`);
    }

    return topic;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    this.findOne(id);

    return this.prisma.topic.update({
      where: { id: +id },
      data: updateTopicDto,
    });
  }

  remove(id: number) {
    this.findOne(id);
    return this.prisma.topic.delete({ where: { id: +id } });
  }
}
