import { Injectable } from '@nestjs/common'
import { CreateGroupTopicSeasonProblemUserInput } from './dto/create-group-topic-season-problem-user.input'
import { UpdateGroupTopicSeasonProblemUserInput } from './dto/update-group-topic-season-problem-user.input'
import { PrismaService } from '../prisma.service'

@Injectable()
export class GroupTopicSeasonProblemUserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createGroupTopicSeasonProblemUserInput: CreateGroupTopicSeasonProblemUserInput,
  ) {
    return 'This action adds a new groupTopicSeasonProblemUser'
  }

  findAll() {
    return `This action returns all groupTopicSeasonProblemUser`
  }

  findOne(id: number) {
    return `This action returns a #${id} groupTopicSeasonProblemUser`
  }

  update(
    updateGroupTopicSeasonProblemUserInput: UpdateGroupTopicSeasonProblemUserInput,
  ) {
    const { groupId, topicId, problemId, userId, seasonId, ...updates } =
      updateGroupTopicSeasonProblemUserInput
    return this.prismaService.groupTopicSeasonProblemUser.upsert({
      where: {
        groupId_topicId_problemId_seasonId_userId: {
          groupId,
          topicId,
          problemId,
          userId,
          seasonId,
        },
      },
      update: updates,
      create: {
        seasonGroupTopicProblem: {
          connect: {
            problemId_groupId_topicId_seasonId: {
              problemId,
              groupId,
              topicId,
              seasonId,
            },
          },
        },
        user: {
          connect: { id: userId },
        },
        ...updates,
      },
    })
  }

  remove(id: number) {
    return `This action removes a #${id} groupTopicSeasonProblemUser`
  }
}
