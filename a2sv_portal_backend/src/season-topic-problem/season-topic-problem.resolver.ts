import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  InputType,
  Field,
} from '@nestjs/graphql'
import {
  SeasonTopicProblemFilter,
  SeasonTopicProblemService,
} from './season-topic-problem.service'
import { SeasonTopicProblem } from './entities/season-topic-problem.entity'
import { CreateSeasonTopicProblemInput } from './dto/create-season-topic-problem.input'
import { UpdateSeasonTopicProblemInput } from './dto/update-season-topic-problem.input'

@InputType()
export class SeasonTopicProblemId {
  @Field()
  seasonId: string
  @Field()
  problemId: string
  @Field()
  topicId: string
}

@Resolver(() => SeasonTopicProblem)
export class SeasonTopicProblemResolver {
  constructor(
    private readonly seasonTopicProblemService: SeasonTopicProblemService,
  ) {}

  @Mutation(() => SeasonTopicProblem)
  createSeasonTopicProblem(
    @Args('createSeasonTopicProblemInput')
    createSeasonTopicProblemInput: CreateSeasonTopicProblemInput,
  ) {
    return this.seasonTopicProblemService.create(createSeasonTopicProblemInput)
  }

  @Query(() => [SeasonTopicProblem], { name: 'seasonTopicProblem' })
  seasonTopicProblems(
    @Args('seasonTopicProblemFilter', { type: () => SeasonTopicProblemFilter })
    seasonTopicProblemFilter: SeasonTopicProblemFilter,
  ) {
    return this.seasonTopicProblemService.findAll(seasonTopicProblemFilter)
  }

  @Query(() => SeasonTopicProblem, { name: 'seasonTopicProblem' })
  seasonTopicProblem(
    @Args('seasonTopicProblemId', { type: () => Int }) id: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.findOne(id)
  }

  @Mutation(() => SeasonTopicProblem)
  updateSeasonTopicProblem(
    @Args('updateSeasonTopicProblemInput')
    updateSeasonTopicProblemInput: UpdateSeasonTopicProblemInput,
  ) {
    return this.seasonTopicProblemService.update(updateSeasonTopicProblemInput)
  }

  @Mutation(() => SeasonTopicProblem)
  removeSeasonTopicProblem(
    @Args('seasonTopicProblemId', { type: () => Int }) id: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.remove(id)
  }
}
