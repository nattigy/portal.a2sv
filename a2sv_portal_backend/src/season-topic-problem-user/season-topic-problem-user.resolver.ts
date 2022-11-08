import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SeasonTopicProblemUserService } from './season-topic-problem-user.service'
import { SeasonTopicProblemUser } from './entities/season-topic-problem-user.entity'
import { CreateSeasonTopicProblemUserInput } from './dto/create-season-topic-problem-user.input'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'

@Resolver(() => SeasonTopicProblemUser)
export class SeasonTopicProblemUserResolver {
  constructor(
    private readonly seasonTopicProblemUserService: SeasonTopicProblemUserService,
  ) {}

  @Mutation(() => SeasonTopicProblemUser)
  createSeasonTopicProblemUser(
    @Args('createSeasonTopicProblemUserInput')
    createSeasonTopicProblemUserInput: CreateSeasonTopicProblemUserInput,
  ) {
    return this.seasonTopicProblemUserService.create(
      createSeasonTopicProblemUserInput,
    )
  }

  @Query(() => [SeasonTopicProblemUser], { name: 'seasonTopicProblemUser' })
  seasonTopicProblemUsers() {
    return this.seasonTopicProblemUserService.findAll()
  }

  @Query(() => SeasonTopicProblemUser, { name: 'seasonTopicProblemUser' })
  seasonTopicProblemUser(
    @Args('id', { type: () => Int }) id: UpdateSeasonTopicProblemUserInput,
  ) {
    return this.seasonTopicProblemUserService.findOne(id)
  }

  @Mutation(() => SeasonTopicProblemUser)
  updateSeasonTopicProblemUser(
    @Args('updateSeasonTopicProblemUserInput')
    updateSeasonTopicProblemUserInput: UpdateSeasonTopicProblemUserInput,
  ) {
    return this.seasonTopicProblemUserService.update(
      updateSeasonTopicProblemUserInput,
    )
  }

  @Mutation(() => SeasonTopicProblemUser)
  removeSeasonTopicProblemUser(
    @Args('id', { type: () => Int }) id: UpdateSeasonTopicProblemUserInput,
  ) {
    return this.seasonTopicProblemUserService.remove(id)
  }
}
