import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateSeasonTopicInput, SeasonTopicId } from './dto/create-season-topic.input'
import { FilterSeasonTopicInput } from './dto/filter-season-topic.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationSeasonTopic } from '../../common/page/pagination-info'
import { SeasonTopicRepository } from './season-topic.repository'
import { SeasonTopic } from './entities/season-topic.entity'
// import { CreateSeasonTopicResourceInput } from './dto/create-season-topic.input'

@Injectable()
export class SeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly seasonTopicRepository: SeasonTopicRepository,
  ) {}

  async addTopicsToASeason({
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
    console.log(seasonTopics,"val")
    return {
      items: seasonTopics,
      pageInfo: { take, skip, count },
    }
  }


  async removeSeasonTopic({ seasonId, topicId }: SeasonTopicId) {
    return this.seasonTopicRepository.remove({
      seasonId_topicId: { seasonId, topicId },
    })
  }

 async addResourceToSeasonTopic({
    seasonId,
    topicId,
    resources
  }: CreateSeasonTopicInput):Promise<SeasonTopic>{
      return this.seasonTopicRepository.update({
        where: {
          seasonId_topicId: {
            seasonId,topicId
          }
        },
        data: {
      
          // resources:{
          //   connectOrCreate: resources.map(t => ({
          //     where:{link:t.link},
          //     create: { type: t.type, name: t.name, description:t.description, link:t.link}
          //   }))
          // }
        }
      })
  }
}
