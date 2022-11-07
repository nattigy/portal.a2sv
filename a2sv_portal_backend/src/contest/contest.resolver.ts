import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { ContestService } from './contest.service'
import { Contest } from './entities/contest.entity'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { GroupContest } from '../group-contest/entities/group-contest.entity'
import { Problem } from '../problem/entities/problem.entity'

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private readonly contestService: ContestService) {}

  @Mutation(() => Contest)
  createContest(
    @Args('createContestInput') createContestInput: CreateContestInput,
  ) {
    return this.contestService.create(createContestInput)
  }

  @Query(() => [Contest], { name: 'contest' })
  findAll() {
    return this.contestService.findAll()
  }

  @Query(() => [GroupContest], { name: 'groupContestStats' })
  groupContestStats(@Args('groupId') id: string) {
    return this.contestService.groupContestStats(id)
  }

  @Query(() => Contest, { name: 'contest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contestService.findOne(id)
  }

  @Mutation(() => Contest)
  updateContest(
    @Args('updateContestInput') updateContestInput: UpdateContestInput,
  ) {
    return this.contestService.update(updateContestInput.id, updateContestInput)
  }

  @Mutation(() => Contest)
  removeContest(@Args('id', { type: () => Int }) id: number) {
    return this.contestService.remove(id)
  }

  @ResolveField(() => [Problem])
  async problems(@Parent() contest: Contest) {
    return contest.problems
  }
}
