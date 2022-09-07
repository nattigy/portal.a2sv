import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateGroupTopicInput } from './dto/create-group-topic.input'
import { UpdateGroupTopicInput } from './dto/update-group-topic.input'

@Injectable()
export class GroupTopicService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createGroupTopicInput: CreateGroupTopicInput) {
    return this.prismaService.groupTopic.create({
      data: createGroupTopicInput,
      include: {
        topic: true,
        group: true,
      },
    })
  }

  findAll() {
    return this.prismaService.groupTopic.findMany({
      include: {
        group: true,
        topic: true,
      },
    })
  }

  findOne(groupId: number, topicId: number) {
    return this.prismaService.groupTopic.findUnique({
      where: { groupId_topicId: { groupId, topicId } },
      include: {
        group: true,
        topic: true,
      },
    })
  }
  update(id: number, updateGroupTopicInput: UpdateGroupTopicInput) {
    return this.prismaService.groupTopic.update({
      include: {
        topic: true,
        group: true,
      },
      where: {
        groupId_topicId: {
          groupId: updateGroupTopicInput.groupId,
          topicId: updateGroupTopicInput.topicId,
        },
      },
      data: updateGroupTopicInput,
    })
  }

  remove(groupId: number, topicId: number) {
    return this.prismaService.groupTopic.delete({
      include: {
        topic: true,
        group: true,
      },
      where: {
        groupId_topicId: {
          groupId,
          topicId,
        },
      },
    })
  }
}
