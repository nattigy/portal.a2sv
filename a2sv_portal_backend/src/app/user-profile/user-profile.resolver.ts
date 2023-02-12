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
import { BadRequestException } from '@nestjs/common/exceptions'

@Resolver(() => User)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserProfile)
  async createUserProfile(
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
    @CurrentUser() user: User,
  ) {
    try {
      return this.userProfileService.createUserProfile(createUserProfileInput, user)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error creating userProfile!')
    }
  }

  @Query(() => PaginationUserProfile)
  async userProfiles(
    @Args('filterUserProfileInput', { nullable: true })
    filterUserProfileInput?: FilterUserProfileInput,
    @Args('pageInfoInput', { nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationUserProfile> {
    try {
      return this.userProfileService.userProfiles(filterUserProfileInput, pageInfoInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error loading userProfiles!')
    }
  }

  @Query(() => UserProfile)
  async userProfile(@Args('userProfileId') userProfileId: string) {
    try {
      return this.userProfileService.userProfile(userProfileId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error loading userProfile!')
    }
  }

  @Mutation(() => UserProfile)
  async updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ) {
    try {
      return this.userProfileService.updateUserProfile(updateUserProfileInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error Updating userProfile!')
    }
  }

  @Mutation(() => Int)
  async removeUserProfile(@Args('userProfileId') userProfileId: string) {
    try {
      return this.userProfileService.remove(userProfileId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error removing userProfile!')
    }
  }
}
