import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
  CreateSeasonTopicProblemInput,
  SeasonTopicProblemId,
} from './dto/create-season-topic-problem.input'
import { SeasonTopicProblem } from './entities/season-topic-problem.entity'
import { SeasonTopicProblemRepository } from './season-topic-problem.repository'

@Injectable()
export class SeasonTopicProblemService {
  constructor(
    private readonly seasonTopicProblemRepository: SeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async addProblemToSeasonTopic({
    seasonId,
    topicId,
    problemId,
  }: CreateSeasonTopicProblemInput): Promise<SeasonTopicProblem> {
    // TODO: check if the season is active
    // upsert seasonTopic and change create to upsert seasonTopicProblem
    return this.seasonTopicProblemRepository.create({
      seasonTopic: {
        connect: {
          seasonId_topicId: {
            topicId,
            seasonId,
          },
        },
      },
      problem: {
        connect: { id: problemId },
      },
    })
  }

  // async seasonTopicProblem({ seasonId, topicId, problemId }: SeasonTopicProblemId): Promise<SeasonTopicProblem> {
  //   return this.seasonTopicProblemRepository.findOne({
  //     seasonId_topicId_problemId: { seasonId, topicId, problemId },
  //   })
  // }
  //
  // async seasonTopicProblems(
  //   seasonTopicProblemFilter: SeasonTopicProblemFilter,
  //   { skip, take }: PaginationInput = { take: 50, skip: 0 },
  // ): Promise<PaginationSeasonTopicProblem> {
  //   const count = await this.seasonTopicProblemRepository.count(seasonTopicProblemFilter)
  //   const seasonTopicProblems: SeasonTopicProblem[] =
  //     await this.seasonTopicProblemRepository.findAll({
  //       where: seasonTopicProblemFilter,
  //       skip, take,
  //     })
  //   return {
  //     items: seasonTopicProblems,
  //     pageInfo: { skip, take, count },
  //   }
  // }

  async remove({ seasonId, problemId, topicId }: SeasonTopicProblemId) {
    return this.seasonTopicProblemRepository.remove({
      seasonId_topicId_problemId: { seasonId, topicId, problemId },
    })
  }
}
