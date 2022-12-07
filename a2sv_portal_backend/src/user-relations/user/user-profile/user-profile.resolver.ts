import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'
import { UserProfile } from './entities/user-profile.entity'
import { UserProfileService } from './user-profile.service'
import { PaginationUserProfile } from '../../../common/page/pagination-info'
import { PaginationInput } from '../../../common/page/pagination.input'
import { FilterUserProfileInput } from './dto/filter-user-profile.input'

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  // @Mutation(() => UserProfile)
  // async createUserProfile(
  //   @Args('createUserProfileInput')
  //     createUserProfileInput: CreateUserProfileInput,
  // ) {
  //   return this.userProfileService.create(createUserProfileInput)
  // }

  @Query(() => PaginationUserProfile)
  async userProfiles(
    @Args('filterUserProfileInput', { type: () => FilterUserProfileInput, nullable: true })
    filterUserProfileInput?: FilterUserProfileInput,
    @Args('pageInfoInput', { type: () => PaginationInput, nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationUserProfile> {
    return this.userProfileService.findAll(filterUserProfileInput, pageInfoInput)
  }

  @Query(() => UserProfile)
  async userProfile(@Args('id') id: string) {
    return this.userProfileService.findOne(id)
  }

  @Mutation(() => UserProfile)
  async updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ) {
    return this.userProfileService.update(updateUserProfileInput)
  }

  @Mutation(() => Int)
  async removeUserProfile(@Args('userProfileId') userProfileId: string) {
    return this.userProfileService.remove(userProfileId)
  }
}
