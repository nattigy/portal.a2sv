import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { SeasonTopicProblem } from './entities/season-topic-problem.entity'
import { SeasonTopicProblemService } from './season-topic-problem.service'
import descriptions from './season-topic-problem.doc'
import { SeasonTopicId } from '../season-topic/dto/create-season-topic.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { SeasonTopicProblemAbilities } from '../../casl/handler/season-topic-problem-abilities.handler'

@Resolver(() => SeasonTopicProblem)
export class SeasonTopicProblemResolver {
  constructor(private readonly seasonTopicProblemService: SeasonTopicProblemService) {}

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(SeasonTopicProblemAbilities.create)
  // @Mutation(() => SeasonTopicProblem, {
  //   description: descriptions.createSeasonTopicProblem,
  // })
  // async addProblemToSeasonTopic(
  //   @Args('createSeasonTopicProblemInput')
  //   createSeasonTopicProblemInput: CreateSeasonTopicProblemInput,
  // ): Promise<SeasonTopicProblem> {
  //   return this.seasonTopicProblemService.addProblemToSeasonTopic(
  //     createSeasonTopicProblemInput,
  //   )
  // }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicProblemAbilities.create)
  @Mutation(() => Int, {
    description: descriptions.createSeasonTopicProblem,
  })
  async addProblemsToSeasonTopic(
    @Args('seasonTopicId') { seasonId, topicId }: SeasonTopicId,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ) {
    for (const problemId of problemIds) {
      await this.seasonTopicProblemService.addProblemToSeasonTopic({
        seasonId,
        topicId,
        problemId,
      })
    }
    return problemIds.length
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(SeasonTopicProblemAbilities.read)
  // @Query(() => SeasonTopicProblem, { description: descriptions.seasonTopicProblem })
  // async seasonTopicProblem(
  //   @Args('seasonTopicProblemId') seasonTopicProblemId: SeasonTopicProblemId,
  // ): Promise<SeasonTopicProblem> {
  //   return this.seasonTopicProblemService.seasonTopicProblem(seasonTopicProblemId)
  // }
  //
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(SeasonTopicProblemAbilities.read)
  // @Query(() => PaginationSeasonTopicProblem, { description: descriptions.seasonTopicProblems })
  // async seasonTopicProblems(
  //   @Args('seasonTopicId') seasonTopicId: SeasonTopicId,
  //   @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  // ): Promise<PaginationSeasonTopicProblem> {
  //   return this.seasonTopicProblemService.seasonTopicProblems(seasonTopicId, paginationInput)
  // }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(SeasonTopicProblemAbilities.delete)
  // @Mutation(() => SeasonTopicProblem, { description: descriptions.removeSeasonTopicProblem })
  // async removeSeasonTopicProblem(
  //   @Args('seasonTopicProblemId') seasonTopicProblemId: SeasonTopicProblemId,
  // ) {
  //   return this.seasonTopicProblemService.remove(seasonTopicProblemId)
  // }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicProblemAbilities.delete)
  @Mutation(() => Int, { description: descriptions.removeSeasonTopicProblem })
  async removeSeasonTopicProblems(
    @Args('seasonTopicId') { seasonId, topicId }: SeasonTopicId,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<number> {
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
