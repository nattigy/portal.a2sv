import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserContestProblemService } from './user-contest-problem.service';
import { UserContestProblem } from './entities/user-contest-problem.entity';
import { CreateUserContestProblemInput } from './dto/create-user-contest-problem.input';
import { UpdateUserContestProblemInput } from './dto/update-user-contest-problem.input';

@Resolver(() => UserContestProblem)
export class UserContestProblemResolver {
  constructor(private readonly userContestProblemService: UserContestProblemService) {}

  @Mutation(() => UserContestProblem)
  createUserContestProblem(@Args('createUserContestProblemInput') createUserContestProblemInput: CreateUserContestProblemInput) {
    return this.userContestProblemService.create(createUserContestProblemInput);
  }

  @Query(() => [UserContestProblem], { name: 'userContestProblem' })
  findAll() {
    return this.userContestProblemService.findAll();
  }

  @Query(() => UserContestProblem, { name: 'userContestProblem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userContestProblemService.findOne(id);
  }

  @Mutation(() => UserContestProblem)
  updateUserContestProblem(@Args('updateUserContestProblemInput') updateUserContestProblemInput: UpdateUserContestProblemInput) {
    return this.userContestProblemService.update(updateUserContestProblemInput);
  }

  @Mutation(() => UserContestProblem)
  removeUserContestProblem(@Args('id', { type: () => Int }) id: number) {
    return this.userContestProblemService.remove(id);
  }
}
