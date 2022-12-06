import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationUserSeasonContest } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { UserSeasonContest } from './entities/user-season-contest.entity'
import { UserSeasonContestService } from './user-season-contest.service'
import { FilterGroupContestUsersInput } from './dto/filter-group-contest-users.input'
import { UpdateUserContestInput, UserContestId } from './dto/update-user-contest.input'

@Resolver(() => UserSeasonContest)
export class UserSeasonContestResolver {
  constructor(private readonly userContestService: UserSeasonContestService) {}

  // @Mutation(() => UserContest)
  // async createUserContest(
  //   @Args('createUserContestInput')
  //     createUserContestInput: CreateUserContestInput,
  // ): Promise<UserContest> {
  //   return this.userContestService.create(createUserContestInput)
  // }

  @Query(() => PaginationUserSeasonContest)
  async userContests(
    @Args('userId') userId: string,
    @Args('pageInfoInput', { type: () => PaginationInput, nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationUserSeasonContest> {
    return this.userContestService.findAll(userId, pageInfoInput)
  }

  @Query(() => UserSeasonContest)
  async userContest(
    @Args('userContestId') userContestId: UserContestId,
  ): Promise<UserSeasonContest> {
    return this.userContestService.findOne(userContestId)
  }

  @Query(() => PaginationUserSeasonContest)
  async groupContestUsers(
    @Args('filterGroupContestUsersInput', { type: () => FilterGroupContestUsersInput })
    filterGroupContestUsersInput: FilterGroupContestUsersInput,
    @Args('pageInfoInput', { type: () => PaginationInput, nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationUserSeasonContest> {
    return this.userContestService.groupContestUsers(
      filterGroupContestUsersInput,
      pageInfoInput,
    )
  }

  @Mutation(() => UserSeasonContest)
  async updateUserContest(
    @Args('updateUserContestInput')
    updateUserContestInput: UpdateUserContestInput,
  ): Promise<UserSeasonContest> {
    return this.userContestService.update(updateUserContestInput)
  }

  @Mutation(() => Int)
  async removeUserContest(
    @Args('userContestId') userContestId: UserContestId,
  ): Promise<number> {
    return this.userContestService.remove(userContestId)
  }
}
