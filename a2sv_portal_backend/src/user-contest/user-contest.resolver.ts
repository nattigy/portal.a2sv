import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationUserContest } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { UserContest } from './entities/user-contest.entity'
import { UserContestService } from './user-contest.service'
import { FilterGroupContestUsersInput } from './dto/filter-group-contest-users.input'

@Resolver(() => UserContest)
export class UserContestResolver {
  constructor(private readonly userContestService: UserContestService) {}

  // @Mutation(() => UserContest)
  // async createUserContest(
  //   @Args('createUserContestInput')
  //     createUserContestInput: CreateUserContestInput,
  // ): Promise<UserContest> {
  //   return this.userContestService.create(createUserContestInput)
  // }

  @Query(() => PaginationUserContest)
  async userContests(
    @Args('userId') userId: string,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationUserContest> {
    return this.userContestService.findAll(userId, pageInfoInput)
  }

  @Query(() => UserContest)
  async userContest(
    @Args('userId') userId: string,
    @Args('contestId') contestId: string,
  ): Promise<UserContest> {
    return this.userContestService.findOne(userId, contestId)
  }

  @Query(() => PaginationUserContest)
  async groupContestUsers(
    @Args('filterGroupContestUsersInput', { type: () => FilterGroupContestUsersInput })
    filterGroupContestUsersInput: FilterGroupContestUsersInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationUserContest> {
    return this.userContestService.groupContestUsers(
      filterGroupContestUsersInput,
      pageInfoInput,
    )
  }

  // @Mutation(() => UserContest)
  // async updateUserContest(
  //   @Args('updateUserContestInput')
  //   updateUserContestInput: UpdateUserContestInput,
  // ): Promise<UserContest> {
  //   return this.userContestService.update(updateUserContestInput)
  // }

  @Mutation(() => Int)
  async removeUserContest(@Args('id') id: string): Promise<number> {
    return this.userContestService.remove(id)
  }
}
