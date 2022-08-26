import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { CreateGroupInput } from './dto/create-group.input'
import { Group } from './entities/group.entity'
import { GroupsService } from './groups.service'

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(() => Group, { nullable: true })
  async group(@Args('id', { type: () => Int }) id: number): Promise<Group> {
    return this.groupsService.findOneById(id)
  }

  @Mutation((type) => Group, { nullable: true })
  async create(
    @Args('createGroupInput') args: CreateGroupInput,
  ): Promise<Group> {
    return this.groupsService.create(args)
  }
}
