import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  create(createTopicDto: CreateTopicDto) {
    return this.prisma.topic.create({ data: createTopicDto });
  }

  findAll() {
    return this.prisma.topic.findMany({});
  }

  findOne(id: number) {
    const topic = this.prisma.topic.findUnique({ where: { id: +id } });
    if (!topic) {
      throw new HttpException(`Topic #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return topic;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    const existingTopic = this.findOne(id);
    if (existingTopic) {
      return this.prisma.topic.update({
        where: { id: +id },
        data: updateTopicDto,
      });
    }
  }

  remove(id: number) {
    const existingTopic = this.findOne(id);
    if (existingTopic) {
      this.prisma.topic.delete({ where: { id: +id } });
      return { message: 'Successfully Deleted Topic' };
    }
  }
}
