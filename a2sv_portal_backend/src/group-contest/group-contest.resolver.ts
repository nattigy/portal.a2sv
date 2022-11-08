import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupContestService } from './group-contest.service'
import { GroupContest } from './entities/group-contest.entity'
import { UpdateGroupContestInput } from './dto/update-group-contest.input'
import { FindGroupContestInput } from './dto/find-group-contest.input'
import { PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'

@Resolver(() => GroupContest)
export class GroupContestResolver {
  constructor(private readonly groupContestService: GroupContestService) {}

  @Query(() => PaginationOutput<GroupContest>)
  async allGroupContests(
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput: PaginationInfoInput = { skip: 0, take: 10 },
  ): Promise<PaginationOutput<GroupContest>> {
    return this.groupContestService.findAll(pageInfoInput)
  }

  @Query(() => PaginationOutput<GroupContest>)
  async groupContests(
    @Args('groupId') groupId: string,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput: PaginationInfoInput = { skip: 0, take: 10 },
  ): Promise<PaginationOutput<GroupContest>> {
    return this.groupContestService.groupContests(groupId, pageInfoInput)
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
    @Args('findGroupContestInput') findGroupContestInput: FindGroupContestInput,
  ): Promise<GroupContest> {
    return this.groupContestService.groupContest(findGroupContestInput)
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
