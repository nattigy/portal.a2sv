import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateGroupTopicProblemInput } from './dto/create-group-topic-problem.input'
import { UpdateGroupTopicProblemInput } from './dto/update-group-topic-problem.input'

@Injectable()
export class GroupTopicProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createGroupTopicProblemInput: CreateGroupTopicProblemInput) {
    const { problemId, topicId, groupId, ...data } =
      createGroupTopicProblemInput
    return this.prismaService.groupTopicProblem.create({
      data: data,
      include: {
        problem: true,
        groupTopic: true,
      },
    })
  }

  findAll() {
    return this.prismaService.groupTopicProblem.findMany({
      include: {
        problem: true,
        groupTopic: true,
      },
    })
  }

  findOne(groupId: number, topicId: number, problemId: number) {
    return this.prismaService.groupTopicProblem.findUnique({
      where: {
        problemId_groupId_topicId: {
          groupId,
          topicId,
          problemId,
        },
      },
      include: {
        problem: true,
        groupTopic: true,
      },
    })
  }

  update(updateGroupTopicProblemInput: UpdateGroupTopicProblemInput) {
    const { id, groupId, topicId, groupTopic, problem, problemId, ...data } =
      updateGroupTopicProblemInput
    return this.prismaService.groupTopicProblem.update({
      where: {
        problemId_groupId_topicId: {
          groupId: updateGroupTopicProblemInput.groupId,
          topicId: updateGroupTopicProblemInput.topicId,
          problemId: updateGroupTopicProblemInput.problemId,
        },
      },
      data: data,
      include: {
        problem: true,
        groupTopic: true,
      },
    })
  }

  remove(groupId: number, topicId: number, problemId: number) {
    return this.prismaService.groupTopicProblem.delete({
      where: {
        problemId_groupId_topicId: {
          groupId,
          topicId,
          problemId,
        },
      },
    })
  }
}
