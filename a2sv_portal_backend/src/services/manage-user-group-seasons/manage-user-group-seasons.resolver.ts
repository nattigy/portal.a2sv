import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ManageUserGroupSeasonTopicsService } from './manage-user-group-season-topics.service'
import { ManageUserGroupSeasonTopicProblemsService } from './manage-user-group-season-topic-problems.service'
import { UserGroupSeason } from '../../app/user-group-season/entities/user-group-season.entity'
import { UserGroupSeasonId } from '../../app/user-group-season/dto/create-group-user-season.input'
import { FilterUserGroupSeasonInput } from '../../app/user-group-season/dto/filter-user-group-season-input'
import { PaginationInput } from '../../common/page/pagination.input'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { UserGroupSeasonTopicId } from '../../app/user-group-season-topic/dto/create-user-group-season-topic.input'
import {
  PaginationUserGroupSeasonTopic,
  PaginationUserGroupSeasonTopicProblem,
} from '../../common/page/pagination-info'
import {
  FilterUserGroupSeasonTopicInput,
} from '../../app/user-group-season-topic/dto/filter-user-group-season-topic-input'
import {
  UserGroupSeasonTopicProblem,
} from '../../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import {
  UserGroupSeasonTopicProblemId,
} from '../../app/user-group-season-topic-problem/dto/user-group-season-topic-problem-id.input'
import {
  FilterUserGroupSeasonTopicProblemInput,
} from '../../app/user-group-season-topic-problem/dto/filter-user-group-season-topic-problem.input'
import { ManageUserGroupSeasonsService } from './manage-user-group-seasons.service'

@Resolver()
export class ManageUserGroupSeasonsResolver {
  constructor(
    private readonly userGroupSeasonService: ManageUserGroupSeasonsService,
    private readonly userGroupSeasonTopicService: ManageUserGroupSeasonTopicsService,
    private readonly seasonTopicUserProblemService: ManageUserGroupSeasonTopicProblemsService,
  ) {
  }

  @Query(() => UserGroupSeason)
  async userGroupSeason(
    @Args('userGroupSeasonId') userGroupSeasonId: UserGroupSeasonId,
  ): Promise<UserGroupSeason> {
    return this.userGroupSeasonService.userGroupSeason(userGroupSeasonId)
  }

  @Query(() => [UserGroupSeason])
  async userGroupSeasons(
    @Args('filterUserGroupSeasonInput') filterUserGroupSeasonInput: FilterUserGroupSeasonInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<UserGroupSeason[]> {
    return this.userGroupSeasonService.userGroupSeasons(
      filterUserGroupSeasonInput,
      paginationInput,
    )
  }

  @Mutation(() => UserGroupSeason)
  async removeUserGroupSeason(
    @Args('userGroupSeasonId') userGroupSeasonId: UserGroupSeasonId,
  ) {
    return this.userGroupSeasonService.removeUserGroupSeason(userGroupSeasonId)
  }

  @Query(() => UserGroupSeasonTopic)
  async userGroupSeasonTopic(
    @Args('userGroupSeasonTopicId') userGroupSeasonTopicId: UserGroupSeasonTopicId,
  ) {
    return this.userGroupSeasonTopicService.userGroupSeasonTopic(userGroupSeasonTopicId)
  }

  @Query(() => PaginationUserGroupSeasonTopic)
  async userGroupSeasonTopics(
    @Args('filterUserGroupSeasonTopicInput', { nullable: true })
      filterUserGroupSeasonTopicInput?: FilterUserGroupSeasonTopicInput,
    @Args('pageInfoInput', { nullable: true })
      pageInfoInput?: PaginationInput,
  ) {
    return this.userGroupSeasonTopicService.userGroupSeasonTopics(
      filterUserGroupSeasonTopicInput,
      pageInfoInput,
    )
  }

  @Query(() => UserGroupSeasonTopicProblem)
  async userGroupSeasonTopicProblem(
    @Args('userGroupSeasonTopicProblemId')
      userGroupSeasonTopicProblemId: UserGroupSeasonTopicProblemId,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.userGroupSeasonTopicProblem(
      userGroupSeasonTopicProblemId,
    )
  }

  @Query(() => PaginationUserGroupSeasonTopicProblem)
  async userGroupSeasonTopicProblems(
    @Args('filterUserGroupSeasonTopicProblemInput')
      filterUserGroupSeasonTopicProblemInput: FilterUserGroupSeasonTopicProblemInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<PaginationUserGroupSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.userGroupSeasonTopicProblems(
      filterUserGroupSeasonTopicProblemInput,
      pageInfoInput,
    )
  }
}
