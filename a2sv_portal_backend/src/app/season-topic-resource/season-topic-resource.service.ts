import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateSeasonTopicResourceInput } from './dto/update-season-topic-resource.input'
import { SeasonTopicResource } from './entities/season-topic-resource.entity'
import { SeasonTopicResourceRepository } from './season-topic-resource.repository'
import { SeasonTopicResourceId } from './dto/create-season-topic-resource.input'

@Injectable()
export class SeasonTopicResourceService {
  constructor(
    private readonly seasonTopicResourceRepository: SeasonTopicResourceRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async updateSeasonTopicResource(
    { seasonId, topicId, resourceId }: SeasonTopicResourceId,
    updateSeasonTopicResource: UpdateSeasonTopicResourceInput,
  ): Promise<SeasonTopicResource> {
    const foundResource = await this.prismaService.seasonTopicResource.findUnique({
      where: {
        id_seasonId_topicId: {
          id: resourceId,
          seasonId,
          topicId,
        },
      },
    })
    if (!foundResource) throw new NotFoundException('Resource Not Found')
    return this.seasonTopicResourceRepository.update({
      where: {
        id_seasonId_topicId: {
          id: resourceId,
          seasonId,
          topicId,
        },
      },
      data: updateSeasonTopicResource,
    })
  }

  async removeSeasonTopicResource({ seasonId, topicId, resourceId }: SeasonTopicResourceId) {
    return this.seasonTopicResourceRepository.remove({
      id_seasonId_topicId: {
        id: resourceId,
        seasonId,
        topicId,
      },
    })
  }
}
