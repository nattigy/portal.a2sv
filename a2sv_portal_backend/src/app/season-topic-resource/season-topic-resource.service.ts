import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SeasonTopicId } from '../season-topic/dto/create-season-topic.input'
import { UpdateSeasonTopicResourceInput } from './dto/update-season-topic-resource.input'
import { SeasonTopicResource } from './entities/season-topic-resource.entity'
import { SeasonTopicResourceRepository } from './season-topic-resource.repository'

@Injectable()
export class SeasonTopicResourceService {
  constructor(
    private readonly seasonTopicResourceRepository: SeasonTopicResourceRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async updateSeasonTopicResource(
    { seasonId, topicId }: SeasonTopicId,
    updateSeasonTopicResource: UpdateSeasonTopicResourceInput,
  ): Promise<SeasonTopicResource> {
    const foundResource = await this.prismaService.seasonTopicResource.findUnique({
      where: {
        seasonId_topicId: {
          seasonId,
          topicId,
        },
      },
    })
    if (!foundResource) throw new NotFoundException('Resource Not Found')
    return this.seasonTopicResourceRepository.update({
      where: {
        seasonId_topicId: {
          seasonId,
          topicId,
        },
      },
      data: updateSeasonTopicResource,
    })
  }

  async removeSeasonTopicResource({ seasonId, topicId }: SeasonTopicId) {
    return this.seasonTopicResourceRepository.remove({
      seasonId_topicId: { seasonId, topicId },
    })
  }
}
