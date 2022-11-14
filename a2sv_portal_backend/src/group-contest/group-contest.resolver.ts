import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationGroupContests, PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { FilterGroupContestInput } from './dto/filter-group-contest.input'
import { UpdateGroupContestInput } from './dto/update-group-contest.input'
import { GroupContest } from './entities/group-contest.entity'
import { GroupContestService } from './group-contest.service'

@Resolver(() => GroupContest)
export class GroupContestResolver {
  constructor(private readonly groupContestService: GroupContestService) {}

  @Query(() => PaginationGroupContests)
  async groupContests(
    @Args('filterGroupContestInput', { type: () => FilterGroupContestInput, nullable: true })
    filterGroupContestInput: FilterGroupContestInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput: PaginationInfoInput,
  ): Promise<PaginationGroupContests> {
    return this.groupContestService.findAll(filterGroupContestInput, pageInfoInput)
  }

  // @Query(() => GroupContest)
  // async contestLeaderboard(
  //   @Args('contestId') contestId: string, @Args('groupId') groupId: string
  // ): Promise<GroupContest> {
  //   return this.groupContestService.contestLeaderboard(contestId, groupId)
  // }

  // @Query(() => GroupContestStat)
  // async contestTopStudents(
  //   @Args('contestId') contestId: string, @Context() context
  // ): Promise<GroupContestStat> {
  //   const groupId = context.user.groupId;
  //   return this.groupContestService.contestLeaderboard(contestId, groupId)
  // }

  @Query(() => GroupContest)
  async groupContest(
    @Args('groupId') groupId: string,
    @Args('groupId') contestId: string,
  ): Promise<GroupContest> {
    return this.groupContestService.findOne(groupId, contestId)
  }

  @Mutation(() => GroupContest)
  async updateGroupContest(
    @Args('updateGroupContestInput')
    updateGroupContestInput: UpdateGroupContestInput,
  ): Promise<GroupContest> {
    return this.groupContestService.update(updateGroupContestInput)
  }

  @Mutation(() => Int)
  async removeGroupContest(
    @Args('groupId') groupId: string,
    @Args('contestId') contestId: string,
  ): Promise<number> {
    return this.groupContestService.remove(groupId, contestId)
  }
}
