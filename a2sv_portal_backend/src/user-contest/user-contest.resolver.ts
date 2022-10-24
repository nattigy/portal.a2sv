import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserContestService } from './user-contest.service';
import { UserContest } from './entities/user-contest.entity';
import { CreateUserContestInput } from './dto/create-user-contest.input';
import { UpdateUserContestInput } from './dto/update-user-contest.input';

@Resolver(() => UserContest)
export class UserContestResolver {
  constructor(private readonly userContestService: UserContestService) {}

  @Mutation(() => UserContest)
  createUserContest(@Args('createUserContestInput') createUserContestInput: CreateUserContestInput) {
    return this.userContestService.create(createUserContestInput);
  }

  @Query(() => [UserContest], { name: 'userContest' })
  findAll() {
    return this.userContestService.findAll();
  }

  @Query(() => UserContest, { name: 'userContest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userContestService.findOne(id);
  }

  @Mutation(() => UserContest)
  updateUserContest(@Args('updateUserContestInput') updateUserContestInput: UpdateUserContestInput) {
    return this.userContestService.update(updateUserContestInput.id, updateUserContestInput);
  }

  @Mutation(() => UserContest)
  removeUserContest(@Args('id', { type: () => Int }) id: number) {
    return this.userContestService.remove(id);
  }
}
