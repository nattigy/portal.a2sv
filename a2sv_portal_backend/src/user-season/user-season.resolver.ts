import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserSeasonService } from './user-season.service';
import { UserSeason } from './entities/user-season.entity';
import { CreateUserSeasonInput } from './dto/create-user-season.input';
import { UpdateUserSeasonInput } from './dto/update-user-season.input';

@Resolver(() => UserSeason)
export class UserSeasonResolver {
  constructor(private readonly userSeasonService: UserSeasonService) {}

  @Mutation(() => UserSeason)
  createUserSeason(@Args('createUserSeasonInput') createUserSeasonInput: CreateUserSeasonInput) {
    return this.userSeasonService.create(createUserSeasonInput);
  }

  @Query(() => [UserSeason], { name: 'userSeason' })
  findAll() {
    return this.userSeasonService.findAll();
  }

  @Query(() => UserSeason, { name: 'userSeason' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userSeasonService.findOne(id);
  }

  @Mutation(() => UserSeason)
  updateUserSeason(@Args('updateUserSeasonInput') updateUserSeasonInput: UpdateUserSeasonInput) {
    return this.userSeasonService.update(updateUserSeasonInput.id, updateUserSeasonInput);
  }

  @Mutation(() => UserSeason)
  removeUserSeason(@Args('id', { type: () => Int }) id: number) {
    return this.userSeasonService.remove(id);
  }
}
