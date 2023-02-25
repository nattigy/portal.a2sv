import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ManageGroupSeasonContestService } from './manage-group-season-contest.service'
import { GroupSeasonContest } from '../../app/group-season-contest/entities/group-season-contest.entity'
import {
  CreateGroupSeasonContestInput,
  GroupSeasonContestId,
} from '../../app/group-season-contest/dto/create-group-season-contest.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterGroupSeasonContestInput } from '../../app/group-season-contest/dto/filter-group-season-contest.input'

@Resolver()
export class ManageGroupSeasonContestResolver {
  constructor(
    private readonly manageGroupSeasonContestService: ManageGroupSeasonContestService,
  ) {
  }

  @Mutation(() => GroupSeasonContest)
  async addContestToAGroupSeason(
    @Args('createGroupSeasonContestInput')
      createGroupSeasonContestInput: CreateGroupSeasonContestInput,
  ) {
    return this.manageGroupSeasonContestService.addContestToAGroupSeason(
      createGroupSeasonContestInput,
    )
  }

  @Query(() => [GroupSeasonContest])
  async groupSeasonContests(
    @Args('filterGroupSeasonContestInput') filterGroupSeasonContestInput: FilterGroupSeasonContestInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<GroupSeasonContest[]> {
    return this.manageGroupSeasonContestService.groupSeasonContests(
      filterGroupSeasonContestInput,
      paginationInput,
    )
  }

  @Query(() => GroupSeasonContest)
  async groupSeasonContest(
    @Args('groupSeasonContestId') groupSeasonContestId: GroupSeasonContestId,
  ) {
    return this.manageGroupSeasonContestService.groupSeasonContest(groupSeasonContestId)
  }

  @Mutation(() => GroupSeasonContest)
  async removeGroupSeasonContest(
    @Args('groupSeasonContestId') groupSeasonContestId: GroupSeasonContestId,
  ) {
    return this.manageGroupSeasonContestService.removeGroupSeasonContest(groupSeasonContestId)
  }

  // @Mutation(() => Int)
  // async addProblemsToContest(
  //   @Args('contestId') contestId: string,
  //   @Args('problemIds', { type: () => [String] }) problemIds: string[],
  // ) {
  //   return this.manageGroupSeasonContestService.addProblemsToContest(contestId, problemIds)
  // }

  // @Mutation(() => GroupSeasonContestProblem)
  // removeGroupSeasonContestProblem(@Args('id', { type: () => Int }) id: number) {
  //   return this.manageGroupSeasonContestService.remove(id)
  // }
}
