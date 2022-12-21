import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserGroupSeasonId } from '../../app/user-group-season/dto/create-group-user-season.input'
import { UserGroupSeason } from '../../app/user-group-season/entities/user-group-season.entity'
import { UserGroupSeasonService } from './user-group-season.service'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserGroupSeasonInput } from '../../app/user-group-season/dto/filter-user-group-season-input'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { UserGroupSeasonTopicId } from '../../app/user-group-season-topic/dto/create-user-group-season-topic.input'
import { PaginationUserGroupSeasonContest, PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import {
  FilterUserGroupSeasonTopicInput,
} from '../../app/user-group-season-topic/dto/filter-user-group-season-topic-input'
import {
  UpdateUserGroupSeasonTopicInput,
} from '../../app/user-group-season-topic/dto/update-user-group-season-topic.input'
import {
  UserGroupSeasonTopicProblem,
} from '../../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import {
  UpdateUserGroupSeasonTopicProblemInput,
} from '../../app/user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'
import {
  UserGroupSeasonTopicProblemId,
} from '../../app/user-group-season-topic-problem/dto/user-group-season-topic-problem-id.input'
import { UserGroupSeasonContestService } from './user-group-season-contest.service'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'
import { UserGroupSeasonContest } from '../../app/user-group-season-contest/entities/user-group-season-contest.entity'
import {
  FilterUserGroupSeasonContestInput,
} from '../../app/user-group-season-contest/dto/filter-user-group-season-contest.input'
import {
  UpdateUserGroupSeasonContestInput,
} from '../../app/user-group-season-contest/dto/update-user-group-season-contest.input'
import {
  UserGroupSeasonContestProblem,
} from '../../app/user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'
import {
  UpdateUserGroupSeasonContestProblemInput,
} from '../../app/user-group-season-contest-problem/dto/update-user-group-season-contest-problem.input'
import {
  UserGroupSeasonContestProblemId,
} from '../../app/user-group-season-contest-problem/dto/create-user-group-season-contest-problem.input'

@Resolver(() => UserGroupSeason)
export class UserGroupSeasonResolver {
  constructor(
    private readonly userGroupSeasonService: UserGroupSeasonService,
    private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService,
    private readonly seasonTopicUserProblemService: UserGroupSeasonTopicProblemService,
    // private readonly userGroupSeasonContestService: UserGroupSeasonContestService,
    // private readonly userGroupSeasonContestProblemService: UserGroupSeasonContestProblemService,
  ) {
  }

  @Query(() => UserGroupSeason)
  async userGroupSeason(
    @Args('userGroupSeasonId') userGroupSeasonId: UserGroupSeasonId,
  ): Promise<UserGroupSeason> {
    return this.userGroupSeasonService.userGroupSeason(userGroupSeasonId)
  }

  @Query(() => UserGroupSeason)
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

  @Mutation(() => UserGroupSeasonTopic)
  async updateUserTopicComfortability(
    @Args('updateUserTopicComfortabilityInput')
      updateUserTopicComfortabilityInput: UpdateUserGroupSeasonTopicInput,
  ) {
    return this.userGroupSeasonTopicService.updateUserTopicComfortability(
      updateUserTopicComfortabilityInput,
    )
  }

  @Mutation(() => UserGroupSeasonTopicProblem)
  async updateUserProblemStatus(
    @Args('updateProblemStatusInput')
      updateProblemStatusInput: UpdateUserGroupSeasonTopicProblemInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.userGroupSeasonTopicService.updateUserProblemStatus(updateProblemStatusInput)
  }

  // @Mutation(() => UserGroupSeasonTopic)
  // async removeUserGroupSeasonTopic(
  //   @Args('userGroupSeasonTopicId') userGroupSeasonTopicId: UserGroupSeasonTopicId,
  // ) {
  //   return this.userGroupSeasonTopicService.removeUserGroupSeasonTopic(userGroupSeasonTopicId)
  // }

  @Query(() => UserGroupSeasonTopicProblem)
  async userGroupSeasonTopicProblem(
    @Args('userGroupSeasonTopicProblemId')
      userGroupSeasonTopicProblemId: UserGroupSeasonTopicProblemId,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.userGroupSeasonTopicProblem(
      userGroupSeasonTopicProblemId,
    )
  }

  // @Query(() => PaginationUserGroupSeasonTopicProblem)
  // async userGroupSeasonTopicProblems(
  //   @Args('filterUserGroupSeasonTopicProblemInput')
  //   filterUserGroupSeasonTopicProblemInput: FilterUserGroupSeasonTopicProblemInput,
  //   @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  // ): Promise<PaginationUserGroupSeasonTopicProblem> {
  //   return this.seasonTopicUserProblemService.userGroupSeasonTopicProblems(
  //     filterUserGroupSeasonTopicProblemInput,
  //     pageInfoInput,
  //   )
  // }

  // @Mutation(() => Int)
  // async removeUserGroupSeasonTopicProblem(
  //   @Args('seasonTopicProblemUserId') seasonTopicProblemUserId: UserGroupSeasonTopicProblemId,
  // ) {
  //   return this.seasonTopicUserProblemService.removeUserGroupSeasonTopicProblem(
  //     seasonTopicProblemUserId,
  //   )
  // }

  // @Query(() => UserGroupSeasonContest)
  // async userGroupSeasonContest(
  //   @Args('userGroupSeasonContestId') userGroupSeasonContestId: UserGroupSeasonContestId,
  // ): Promise<UserGroupSeasonContest> {
  //   return this.userGroupSeasonContestService.userGroupSeasonContest(userGroupSeasonContestId)
  // }

  // @Query(() => PaginationUserGroupSeasonContest)
  // async userGroupSeasonContests(
  //   @Args('filterUserGroupSeasonContestInput') filterUserGroupSeasonContestInput: FilterUserGroupSeasonContestInput,
  //   @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  // ): Promise<PaginationUserGroupSeasonContest> {
  //   return this.userGroupSeasonContestService.userGroupSeasonContests(filterUserGroupSeasonContestInput, paginationInput)
  // }
  //
  // @Mutation(() => UserGroupSeasonContest)
  // async updateUserGroupSeasonContest(
  //   @Args('updateUserGroupSeasonContestInput')
  //     updateUserContestInput: UpdateUserGroupSeasonContestInput,
  // ): Promise<UserGroupSeasonContest> {
  //   return this.userGroupSeasonContestService.updateUserGroupSeasonContest(updateUserContestInput)
  // }
  //
  // @Mutation(() => UserGroupSeasonContestProblem)
  // async updateUserContestProblem(
  //   @Args('updateUserGroupSeasonContestProblemInput')
  //     updateUserContestProblemInput: UpdateUserGroupSeasonContestProblemInput,
  // ) {
  //   return this.userGroupSeasonContestService.updateUserContestProblem(updateUserContestProblemInput)
  // }
  //
  // // @Mutation(() => Int)
  // // async removeUserGroupSeasonContest(
  // //   @Args('userGroupSeasonContestId') userGroupSeasonContestId: UserGroupSeasonContestId,
  // // ): Promise<number> {
  // //   return this.userGroupSeasonContestService.removeUserGroupSeasonContest(userGroupSeasonContestId)
  // // }
  //
  // @Query(() => UserGroupSeasonContestProblem)
  // async userGroupSeasonContestProblem(
  //   @Args('userGroupSeasonContestProblemId') userGroupSeasonContestProblemId: UserGroupSeasonContestProblemId,
  // ) {
  //   return this.userGroupSeasonContestProblemService.userGroupSeasonContestProblem(userGroupSeasonContestProblemId)
  // }
  //
  // // @Query(() => PaginationUserGroupSeasonContestProblem)
  // // async userGroupSeasonContestProblems(
  // //   @Args('filterUserGroupSeasonContestProblemInput', { nullable: true})
  // //   filterUserGroupSeasonContestProblemInput?: FilterUserGroupSeasonContestProblemInput,
  // //   @Args('pageInfoInput', {  nullable: true }) pageInfoInput?: PaginationInput,
  // // ) {
  // //   return this.userGroupSeasonContestProblemService.userGroupSeasonContestProblems(filterUserGroupSeasonContestProblemInput, pageInfoInput)
  // // }
  //
  // // @Mutation(() => Int)
  // // async removeUserGroupSeasonContestProblem(
  // //   @Args('userGroupSeasonContestProblemId')
  // //   userGroupSeasonContestProblemId: UserGroupSeasonContestProblemId,
  // // ) {
  // //   return this.userGroupSeasonContestProblemService.removeUserGroupSeasonContestProblem(
  // //     userGroupSeasonContestProblemId,
  // //   )
  // // }
}
