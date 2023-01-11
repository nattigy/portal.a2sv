import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../user/entities/user.entity'
import { UserProfileService } from './user-profile.service'
import { UserProfile } from './entities/user-profile.entity'
import { CreateUserProfileInput } from './dto/create-user-profile.input'
import { PaginationUserProfile } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserProfileInput } from './dto/filter-user-profile.input'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'
import { CurrentUser } from '../auth/auth.decorator'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'

@Resolver(() => User)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserProfile)
  async createUserProfile(
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
    @CurrentUser() user: User
  ) {
    return this.userProfileService.createUserProfile(createUserProfileInput, user)
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
