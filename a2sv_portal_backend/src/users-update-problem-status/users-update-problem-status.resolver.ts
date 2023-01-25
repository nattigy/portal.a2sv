import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersUpdateProblemStatusService } from './users-update-problem-status.service'
import { UserGroupSeasonTopicProblem } from '../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import { UpdateUserGroupSeasonTopicProblemInput } from '../app/user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'

@Resolver()
export class UsersUpdateProblemStatusResolver {
  constructor(
    private readonly usersUpdateProblemStatusService: UsersUpdateProblemStatusService,
  ) {}

  @Mutation(() => UserGroupSeasonTopicProblem)
  async updateUserProblemStatus(
    @Args('updateProblemStatusInput')
    updateProblemStatusInput: UpdateUserGroupSeasonTopicProblemInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.usersUpdateProblemStatusService.updateSeasonTopicProblemStatus(
      updateProblemStatusInput,
    )
  }
}
