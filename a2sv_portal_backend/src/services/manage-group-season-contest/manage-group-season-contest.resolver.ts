import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ManageGroupSeasonContestService } from './manage-group-season-contest.service'
import { ManageGroupSeasonContest } from './entities/manage-group-season-contest.entity'
import { GroupSeasonContest } from '../../app/group-season-contest/entities/group-season-contest.entity'
import {
  CreateGroupSeasonContestInput,
  GroupSeasonContestId,
} from '../../app/group-season-contest/dto/create-group-season-contest.input'
import { GroupSeasonId } from '../../app/group-season/dto/create-group-season.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { UpdateGroupSeasonContestInput } from '../../app/group-season-contest/dto/update-group-season-contest.input'

@Resolver(() => ManageGroupSeasonContest)
export class ManageGroupSeasonContestResolver {
  constructor(private readonly manageGroupSeasonContestService: ManageGroupSeasonContestService) {
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

  @Query(() => GroupSeasonContest)
  async groupSeasonContests(
    @Args('filter') { groupId, seasonId }: GroupSeasonId,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<GroupSeasonContest[]> {
    return this.manageGroupSeasonContestService.groupSeasonContests(
      { groupId, seasonId },
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
  async updateGroupSeasonContest(
    @Args('updateGroupSeasonContestInput')
      updateGroupSeasonContestInput: UpdateGroupSeasonContestInput,
  ) {
    return this.manageGroupSeasonContestService.updateGroupSeasonContest(
      updateGroupSeasonContestInput,
    )
  }

  @Mutation(() => GroupSeasonContest)
  async removeGroupSeasonContest(
    @Args('groupSeasonContestId') groupSeasonContestId: GroupSeasonContestId,
  ) {
    return this.manageGroupSeasonContestService.removeGroupSeasonContest(groupSeasonContestId)
  }

  // @Mutation(() => GroupSeasonContestProblem)
  // createGroupSeasonContestProblem(
  //   @Args('createGroupSeasonContestProblemInput')
  //   createGroupSeasonContestProblemInput: CreateGroupSeasonContestProblemInput,
  // ) {
  //   return this.manageGroupSeasonContestService.create(createGroupSeasonContestProblemInput)
  // }
  //
  // @Query(() => [GroupSeasonContestProblem], { name: 'groupSeasonContestProblem' })
  // findAll() {
  //   return this.manageGroupSeasonContestService.findAll()
  // }
  //
  // @Query(() => GroupSeasonContestProblem, { name: 'groupSeasonContestProblem' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.manageGroupSeasonContestService.findOne(id)
  // }
  //
  // @Mutation(() => GroupSeasonContestProblem)
  // updateGroupSeasonContestProblem(
  //   @Args('updateGroupSeasonContestProblemInput')
  //   updateGroupSeasonContestProblemInput: UpdateGroupSeasonContestProblemInput,
  // ) {
  //   return this.manageGroupSeasonContestService.update(
  //     updateGroupSeasonContestProblemInput.id,
  //     updateGroupSeasonContestProblemInput,
  //   )
  // }
  //
  // @Mutation(() => GroupSeasonContestProblem)
  // removeGroupSeasonContestProblem(@Args('id', { type: () => Int }) id: number) {
  //   return this.manageGroupSeasonContestService.remove(id)
  // }
}
