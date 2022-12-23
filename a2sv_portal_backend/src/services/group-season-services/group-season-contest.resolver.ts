import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonService } from './group-season.service'
import { GroupSeason } from '../../app/group-season/entities/group-season.entity'
import { GroupSeasonContestService } from './group-season-contest.service'
import { GroupSeasonContest } from '../../app/group-season-contest/entities/group-season-contest.entity'
import {
  CreateGroupSeasonContestInput,
  GroupSeasonContestId,
} from '../../app/group-season-contest/dto/create-group-season-contest.input'
import { UpdateGroupSeasonContestInput } from '../../app/group-season-contest/dto/update-group-season-contest.input'
import { GroupSeasonContestProblemService } from './group-season-contest-problem.service'

@Resolver(() => GroupSeason)
export class GroupSeasonContestResolver {
  constructor(
    private readonly groupSeasonService: GroupSeasonService,
    private readonly groupSeasonContestService: GroupSeasonContestService,
    private readonly groupSeasonContestProblemService: GroupSeasonContestProblemService,
  ) {
  }

  @Mutation(() => GroupSeasonContest)
  async addContestToAGroupSeason(
    @Args('createGroupSeasonContestInput')
      createGroupSeasonContestInput: CreateGroupSeasonContestInput,
  ) {
    return this.groupSeasonContestService.addContestToAGroupSeason(createGroupSeasonContestInput)
  }

  @Query(() => [GroupSeasonContest])
  async groupSeasonContests() {
    return this.groupSeasonContestService.groupSeasonContests()
  }

  @Query(() => GroupSeasonContest)
  async groupSeasonContest(@Args('groupSeasonContestId') groupSeasonContestId: GroupSeasonContestId) {
    return this.groupSeasonContestService.groupSeasonContest(groupSeasonContestId)
  }

  @Mutation(() => GroupSeasonContest)
  async updateGroupSeasonContest(
    @Args('updateGroupSeasonContestInput')
      updateGroupSeasonContestInput: UpdateGroupSeasonContestInput,
  ) {
    return this.groupSeasonContestService.updateGroupSeasonContest(
      updateGroupSeasonContestInput,
    )
  }

  @Mutation(() => GroupSeasonContest)
  async removeGroupSeasonContest(@Args('id', { type: () => Int }) id: number) {
    return this.groupSeasonContestService.removeGroupSeasonContest(id)
  }

  // @Mutation(() => GroupSeasonContestProblem)
  // createGroupSeasonContestProblem(
  //   @Args('createGroupSeasonContestProblemInput')
  //   createGroupSeasonContestProblemInput: CreateGroupSeasonContestProblemInput,
  // ) {
  //   return this.groupSeasonContestProblemService.create(createGroupSeasonContestProblemInput)
  // }
  //
  // @Query(() => [GroupSeasonContestProblem], { name: 'groupSeasonContestProblem' })
  // findAll() {
  //   return this.groupSeasonContestProblemService.findAll()
  // }
  //
  // @Query(() => GroupSeasonContestProblem, { name: 'groupSeasonContestProblem' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.groupSeasonContestProblemService.findOne(id)
  // }
  //
  // @Mutation(() => GroupSeasonContestProblem)
  // updateGroupSeasonContestProblem(
  //   @Args('updateGroupSeasonContestProblemInput')
  //   updateGroupSeasonContestProblemInput: UpdateGroupSeasonContestProblemInput,
  // ) {
  //   return this.groupSeasonContestProblemService.update(
  //     updateGroupSeasonContestProblemInput.id,
  //     updateGroupSeasonContestProblemInput,
  //   )
  // }
  //
  // @Mutation(() => GroupSeasonContestProblem)
  // removeGroupSeasonContestProblem(@Args('id', { type: () => Int }) id: number) {
  //   return this.groupSeasonContestProblemService.remove(id)
  // }
}
