import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { CreateUserContestInput } from './dto/create-user-contest.input'
import { UpdateUserContestInput } from './dto/update-user-contest.input'
import { UserContest } from './entities/user-contest.entity'
import { UserContestService } from './user-contest.service'
import { FilterUserContestInput } from './dto/filter-user-contest.input'

@Resolver(() => UserContest)
export class UserContestResolver {
  constructor(private readonly userContestService: UserContestService) {}

  @Mutation(() => UserContest)
  async createUserContest(
    @Args('createUserContestInput')
    createUserContestInput: CreateUserContestInput,
  ): Promise<UserContest> {
    return this.userContestService.create(createUserContestInput)
  }

  @Query(() => PaginationOutput<UserContest>)
  async userContests(
    @Args('filterUserContestInput', { type: () => FilterUserContestInput, nullable: true })
    filterUserContestInput?: FilterUserContestInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationOutput<UserContest>> {
    return this.userContestService.findAll(filterUserContestInput, pageInfoInput)
  }

  @Query(() => UserContest)
  async userContest(
    @Args('userId') userId: string,
    @Args('contestId') contestId: string,
  ): Promise<UserContest> {
    return this.userContestService.findOne(userId, contestId)
  }

  @Mutation(() => UserContest)
  async updateUserContest(
    @Args('updateUserContestInput')
    updateUserContestInput: UpdateUserContestInput,
  ): Promise<UserContest> {
    return this.userContestService.update(updateUserContestInput)
  }

  @Mutation(() => Int)
  async removeUserContest(@Args('id') id: string): Promise<number> {
    return this.userContestService.remove(id)
  }
}
