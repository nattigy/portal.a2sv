import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'
import { UserProfile } from './entities/user-profile.entity'
import { UserProfileService } from './user-profile.service'
import { PaginationUserProfile } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserProfileInput } from './dto/filter-user-profile.input'
import { CreateUserProfileInput } from './dto/create-user-profile.input'

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Mutation(() => UserProfile)
  async createUserProfile(
    @Args('createUserProfileInput')
      createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.userProfileService.createUserProfile(createUserProfileInput)
  }

  @Query(() => PaginationUserProfile)
  async userProfiles(
    @Args('filterUserProfileInput', { nullable: true })
    filterUserProfileInput?: FilterUserProfileInput,
    @Args('pageInfoInput', { nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationUserProfile> {
    return this.userProfileService.userProfiles(filterUserProfileInput, pageInfoInput)
  }

  @Query(() => UserProfile)
  async userProfile(@Args('userProfileId') userProfileId: string) {
    return this.userProfileService.userProfile(userProfileId)
  }

  @Mutation(() => UserProfile)
  async updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ) {
    return this.userProfileService.updateUserProfile(updateUserProfileInput)
  }

  @Mutation(() => Int)
  async removeUserProfile(@Args('userProfileId') userProfileId: string) {
    return this.userProfileService.remove(userProfileId)
  }
}
