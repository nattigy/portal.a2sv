import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserProfileInput } from './dto/create-user-profile.input'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'
import { UserProfile } from './entities/user-profile.entity'
import { UserProfileService } from './user-profile.service'
import { PaginationUserProfile } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { FilterUserProfileInput } from './dto/filter-user-profile.input'

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {
  }

  @Mutation(() => UserProfile)
  async createUserProfile(
    @Args('createUserProfileInput')
      createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.userProfileService.create(createUserProfileInput)
  }

  @Query(() => PaginationUserProfile)
  async userProfiles(
    @Args('filterUserProfileInput', { type: () => FilterUserProfileInput, nullable: true })
      filterUserProfileInput?: FilterUserProfileInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
      pageInfoInput?: PaginationInfoInput,
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

  @Mutation(() => UserProfile)
  async removeUserProfile(@Args('id', { type: () => String }) id: string) {
    return this.userProfileService.remove(id)
  }
}
