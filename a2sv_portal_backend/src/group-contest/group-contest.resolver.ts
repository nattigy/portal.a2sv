import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupContestService } from './group-contest.service';
import { GroupContest } from './entities/group-contest.entity';
import { CreateGroupContestInput } from './dto/create-group-contest.input';
import { UpdateGroupContestInput } from './dto/update-group-contest.input';
import {GroupStatResponse} from "../group/dto/group-stat-response";

@Resolver(() => GroupContest)
export class GroupContestResolver {
  constructor(private readonly groupContestService: GroupContestService) {}

  @Mutation(() => GroupContest)
  createGroupContest(@Args('createGroupContestInput') createGroupContestInput: CreateGroupContestInput) {
    return this.groupContestService.create(createGroupContestInput);
  }

  @Query(() => [GroupContest], { name: 'groupContest' })
  findAll() {
    return this.groupContestService.findAll();
  }

  @Query(() => GroupContest, { name: 'groupContest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupContestService.findOne(id);
  }

  @Mutation(() => GroupContest)
  updateGroupContest(@Args('updateGroupContestInput') updateGroupContestInput: UpdateGroupContestInput) {
    return this.groupContestService.update(updateGroupContestInput.id, updateGroupContestInput);
  }

  @Mutation(() => GroupContest)
  removeGroupContest(@Args('id', { type: () => Int }) id: number) {
    return this.groupContestService.remove(id);
  }
}
