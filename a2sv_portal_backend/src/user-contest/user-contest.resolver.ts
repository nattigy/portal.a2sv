import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationUserContests } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { CreateUserContestInput } from './dto/create-user-contest.input'
import { UpdateUserContestInput } from './dto/update-user-contest.input'
import { UserContest } from './entities/user-contest.entity'
import { UserContestService } from './user-contest.service'

@Resolver(() => UserContest)
export class UserContestResolver {
  constructor(private readonly userContestService: UserContestService) {}

  @Mutation(() => UserContest)
  async createUserContest(
    @Args('createUserContestInput')
    createUserContestInput: CreateUserContestInput,
  ) {
    return this.userContestService.create(createUserContestInput)
  }

  @Query(() => PaginationUserContests)
  async userContests(
    @Args('userId') userId: string,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput: PaginationInfoInput = { skip: 0, take: 10 },
  ): Promise<PaginationUserContests> {
    return this.userContestService.userContests(userId, pageInfoInput)
  }

  @Query(() => UserContest)
  async userContest(
    @Args('userId') userId: string,
    @Args('contestId') contestId: string,
  ) {
    return this.userContestService.userContest(userId, contestId)
  }

  @Mutation(() => UserContest)
  async updateUserContest(
    @Args('updateUserContestInput')
    updateUserContestInput: UpdateUserContestInput,
  ) {
    return this.userContestService.update(updateUserContestInput)
  }

  @Mutation(() => Int)
  async removeUserContest(@Args('id') id: string): Promise<number> {
    return this.userContestService.remove(id)
  }
}
