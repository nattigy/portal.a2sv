import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserProfileService } from './user-profile.service'
import { UserProfile } from './entities/user-profile.entity'
import { CreateUserProfileInput } from './dto/create-user-profile.input'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Mutation(() => UserProfile)
  createUserProfile(
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.userProfileService.create(createUserProfileInput)
  }

  @Query(() => [UserProfile], { name: 'userProfile' })
  findAll() {
    return this.userProfileService.findAll()
  }

  @Query(() => UserProfile, { name: 'userProfile' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userProfileService.findOne(id)
  }

  @Mutation(() => UserProfile)
  updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ) {
    return this.userProfileService.update(
      updateUserProfileInput.id,
      updateUserProfileInput,
    )
  }

  @Mutation(() => UserProfile)
  removeUserProfile(@Args('id', { type: () => String }) id: string) {
    return this.userProfileService.remove(id)
  }
}
