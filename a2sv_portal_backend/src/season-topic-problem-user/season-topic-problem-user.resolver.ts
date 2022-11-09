import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SeasonTopicProblemFilter } from '../season-topic-problem/season-topic-problem.service'
import { CreateSeasonTopicProblemUserInput } from './dto/create-season-topic-problem-user.input'
import { SeasonTopicProblemUserFilter } from './dto/season-topic-problem-user.filter'
import { SeasonTopicProblemUserId } from './dto/season-topic-problem-user.id'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'
import { SeasonTopicProblemUser } from './entities/season-topic-problem-user.entity'
import { SeasonTopicProblemUserService } from './season-topic-problem-user.service'

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

  @Query(() => [SeasonTopicProblemUser], { name: 'seasonTopicProblemUsers' })
  seasonTopicProblemUsers(
    @Args('seasonTopicProblemUserFilter', {
      type: () => SeasonTopicProblemUserFilter,
    })
    seasonTopicProblemUserFilter: SeasonTopicProblemFilter,
  ) {
    return this.seasonTopicProblemUserService.findAll(
      seasonTopicProblemUserFilter,
    )
  }

  @Query(() => SeasonTopicProblemUser, { name: 'seasonTopicProblemUser' })
  seasonTopicProblemUser(
    @Args('id', { type: () => SeasonTopicProblemUserId })
    id: SeasonTopicProblemUserId,
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
    @Args('id', { type: () => SeasonTopicProblemUserId })
    id: SeasonTopicProblemUserId,
  ) {
    return this.seasonTopicProblemUserService.remove(id)
  }
}
