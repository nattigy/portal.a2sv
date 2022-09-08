import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateGroupTopicInput } from './dto/create-group-topic.input'
import { UpdateGroupTopicInput } from './dto/update-group-topic.input'

@Injectable()
export class GroupTopicService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createGroupTopicInput: CreateGroupTopicInput) {
    const { group, topic, problems, ...data } = createGroupTopicInput
    return this.prismaService.groupTopic.create({
      data: data,
      include: {
        topic: true,
        group: true,
        problems: {
          include: {
            problem: true,
          },
        },
      },
    })
  }

  async findAll() {
    return await this.prismaService.groupTopic.findMany({
      include: {
        group: true,
        topic: true,
        problems: {
          include: {
            problem: true,
          },
        },
      },
    })
  }

  findOne(groupId: number, topicId: number) {
    return this.prismaService.groupTopic.findUnique({
      where: { groupId_topicId: { groupId, topicId } },
      include: {
        group: true,
        topic: true,
        problems: {
          include: {
            problem: true,
          },
        },
      },
    })
  }
  update(updateGroupTopicInput: UpdateGroupTopicInput) {
    const { groupId, topicId, group, topic, problems, ...data } =
      updateGroupTopicInput
    const queryData = data as any
    if (problems) {
      queryData.problems = {
        connectOrCreate: problems.map((problem) => {
          return {
            where: {
              problemId_groupId_topicId: {
                problemId: problem.id,
                groupId: groupId,
                topicId: topicId,
              },
            },
            create: {
              problem: {
                connect: {
                  id: problem.id,
                },
              },
            },
          }
        }),
      }
    }
    return this.prismaService.groupTopic.update({
      include: {
        topic: true,
        group: true,
        problems: {
          include: {
            problem: true,
          },
        },
      },
      where: {
        groupId_topicId: {
          groupId: groupId,
          topicId: topicId,
        },
      },
      data: queryData,
    })
  }

  remove(groupId: number, topicId: number) {
    return this.prismaService.groupTopic.delete({
      where: {
        groupId_topicId: {
          groupId,
          topicId,
        },
      },
    })
  }
}
