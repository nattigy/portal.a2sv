import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateSeasonTopicInput, SeasonTopicId } from './dto/create-season-topic.input'
import { FilterSeasonTopicInput } from './dto/filter-season-topic.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationSeasonTopic } from '../../common/page/pagination-info'
import { SeasonTopicRepository } from './season-topic.repository'
import { SeasonTopic } from './entities/season-topic.entity'

@Injectable()
export class SeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly seasonTopicRepository: SeasonTopicRepository,
  ) {}

  async addTopicToASeason({
    seasonId,
    topicId,
  }: CreateSeasonTopicInput): Promise<SeasonTopic> {
    // TODO: check if the season is active
    return this.seasonTopicRepository.create({
      season: { connect: { id: seasonId } },
      topic: { connect: { id: topicId } },
    })
  }

  async seasonTopic({ seasonId, topicId }: SeasonTopicId): Promise<SeasonTopic> {
    /// TODO: generate stat here
    return this.seasonTopicRepository.findOne({
      seasonId_topicId: { seasonId, topicId },
    })
  }

  async seasonsTopics(
    filterSeasonTopicInput: FilterSeasonTopicInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopic> {
    const count = await this.seasonTopicRepository.count(filterSeasonTopicInput)
    /// TODO: generate stat here
    const seasonTopics: SeasonTopic[] = await this.seasonTopicRepository.findAll({
      skip,
      take,
      where: filterSeasonTopicInput,
    })
    return {
      items: seasonTopics,
      pageInfo: { take, skip, count },
    }
  }

  // async update({ seasonId, topicId, problems }: UpdateSeasonTopicInput): Promise<SeasonTopic> {
  //   // TOD: check if the season is active
  //   // TOD: check if seasonTopic exists if not throw "topic hasn't been added to this season!"
  //   return this.seasonTopicRepository.update({
  //     where: { seasonId_topicId: { seasonId, topicId } },
  //     data: {
  //       seasonTopicProblems: {
  //         createMany: {
  //           skipDuplicates: true,
  //           data: problems.map(({ problemId }) => ({
  //             problemId,
  //           })),
  //         },
  //       },
  //     },
  //   })
  // }

  async removeSeasonTopic({ seasonId, topicId }: SeasonTopicId) {
    return this.seasonTopicRepository.remove({
      seasonId_topicId: { seasonId, topicId },
    })
  }
}
