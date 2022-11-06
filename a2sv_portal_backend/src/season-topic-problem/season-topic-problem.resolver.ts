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
import descriptions from './season-topic-problem.doc'

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

  @Mutation(() => SeasonTopicProblem, {
    description: descriptions.createSeasonTopicProblem,
  })
  createSeasonTopicProblem(
    @Args('createSeasonTopicProblemInput')
    createSeasonTopicProblemInput: CreateSeasonTopicProblemInput,
  ) {
    return this.seasonTopicProblemService.create(createSeasonTopicProblemInput)
  }

  @Query(() => [SeasonTopicProblem], {
    name: 'seasonTopicProblem',
    description: descriptions.seasonTopicProblems,
  })
  seasonTopicProblems(
    @Args('seasonTopicProblemFilter', { type: () => SeasonTopicProblemFilter })
    seasonTopicProblemFilter: SeasonTopicProblemFilter,
  ) {
    return this.seasonTopicProblemService.findAll(seasonTopicProblemFilter)
  }

  @Query(() => SeasonTopicProblem, {
    name: 'seasonTopicProblem',
    description: descriptions.seasonTopicProblem,
  })
  seasonTopicProblem(
    @Args('seasonTopicProblemId', { type: () => Int }) id: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.findOne(id)
  }

  @Mutation(() => SeasonTopicProblem, {
    description: descriptions.updateSeasonTopicProblem,
  })
  updateSeasonTopicProblem(
    @Args('updateSeasonTopicProblemInput')
    updateSeasonTopicProblemInput: UpdateSeasonTopicProblemInput,
  ) {
    return this.seasonTopicProblemService.update(updateSeasonTopicProblemInput)
  }

  @Mutation(() => SeasonTopicProblem, {
    description: descriptions.removeSeasonTopicProblem,
  })
  removeSeasonTopicProblem(
    @Args('seasonTopicProblemId', { type: () => Int }) id: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.remove(id)
  }
}
