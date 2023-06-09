import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGroupSeasonTopicInput } from '../../app/group-season-topic/dto/create-group-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { SeasonTopicRepository } from '../../app/season-topic/season-topic.repository'
import { GroupSeasonTopicService } from '../../app/group-season-topic/group-season-topic.service'

@Injectable()
export class ManageGroupSeasonTopicService {
  constructor(
    private readonly groupSeasonTopicService: GroupSeasonTopicService,
    private readonly seasonTopicRepository: SeasonTopicRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async addTopicToGroupSeason({ groupId, seasonId, topicId }: CreateGroupSeasonTopicInput) {
    // search for groupSeason if groupSeason not found throw groupSeason not found exception
    // if there is a groupSeason and if the groupSeason is in active throw "group season must be active"
    // search for the topic and if the topic is not found return topic not found exception
    // if seasonTopic not found add it else leave it as it is (use upsert for this)

    const foundGroupSeason = await this.prismaService.groupSeason.findUnique({
      where: { groupId_seasonId: { groupId, seasonId } },
    })

    const group = await this.prismaService.group.findUnique({
      where: { id: groupId },
    })

    const season = await this.prismaService.season.findUnique({
      where: { id: seasonId },
    })

    if (!group) throw new NotFoundException(`Group with id ${groupId} does not exist!`)

    if (!season) throw new NotFoundException(`Season with id ${seasonId} does not exist!`)

    if (!foundGroupSeason)
      throw new NotFoundException(`Group has not been added to this Season!`)

    if (!foundGroupSeason.isActive) throw new Error(`Group Season is not Active!`)

    const foundTopic = await this.prismaService.topic.findUnique({
      where: { id: topicId },
    })

    if (!foundTopic) throw new NotFoundException(`Topic with id ${topicId} does not exist!`)

    // await this.seasonTopicRepository.upsert({
    //   where: { seasonId_topicId: { seasonId, topicId } },
    //   data: {},
    // })

    return this.groupSeasonTopicService.upsert({
      groupId,
      seasonId,
      topicId,
    })
  }
}
