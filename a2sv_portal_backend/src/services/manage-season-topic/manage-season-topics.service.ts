import { Injectable, NotFoundException } from '@nestjs/common'
import { SeasonTopicProblemService } from '../../app/season-topic-problem/season-topic-problem.service'
import { SeasonTopicId } from '../../app/season-topic/dto/create-season-topic.input'
import { SeasonTopicService } from '../../app/season-topic/season-topic.service'

@Injectable()
export class ManageSeasonTopicService {
  constructor(
    private readonly seasonTopicProblemService: SeasonTopicProblemService,
    private readonly seasonTopicService: SeasonTopicService,
  ) {}

  async addProblemToSeasonTopic(
    { seasonId, topicId }: SeasonTopicId,
    problemIds: string[],
  ): Promise<number> {
    const seasonTopic = await this.seasonTopicService.seasonTopic({
      seasonId,
      topicId,
    })
    if (!seasonTopic) throw new NotFoundException('Season topic not found!')
    for (const problemId of problemIds) {
      await this.seasonTopicProblemService.addProblemToSeasonTopic({
        seasonId,
        topicId,
        problemId,
      })
    }
    return problemIds.length
  }

  async remove({ seasonId, topicId }: SeasonTopicId, problemIds: string[]) {
    for (const problemId of problemIds) {
      await this.seasonTopicProblemService.remove({
        seasonId,
        topicId,
        problemId,
      })
    }
    return problemIds.length
  }
}
