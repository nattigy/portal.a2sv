import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { SeasonTopicProblemAbilities } from '../../casl/handler/season-topic-problem-abilities.handler'
import { ManageSeasonTopicService } from './manage-season-topics.service'
import { JwtAuthGuard } from '../../app/auth/guards/jwt-auth-guard.service'
import descriptions from '../../app/season-topic-problem/season-topic-problem.doc'
import { SeasonTopicId } from '../../app/season-topic/dto/create-season-topic.input'

@Resolver()
export class ManageSeasonTopicsResolver {
  constructor(private readonly manageSeasonTopicService: ManageSeasonTopicService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicProblemAbilities.create)
  @Mutation(() => Int, {
    description: descriptions.createSeasonTopicProblem,
  })
  async addProblemsToSeasonTopic(
    @Args('seasonTopicId') seasonIdTopicId: SeasonTopicId,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ) {
    return this.manageSeasonTopicService.addProblemToSeasonTopic(seasonIdTopicId, problemIds)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicProblemAbilities.delete)
  @Mutation(() => Int, { description: descriptions.removeSeasonTopicProblem })
  async removeSeasonTopicProblems(
    @Args('seasonTopicId') seasonIdTopicId: SeasonTopicId,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<number> {
    return this.manageSeasonTopicService.remove(seasonIdTopicId, problemIds)
  }
}
