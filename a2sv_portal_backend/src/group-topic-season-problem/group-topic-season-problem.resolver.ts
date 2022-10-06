import {Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql'
import {GroupTopicSeasonProblemService} from './group-topic-season-problem.service'
import {GroupTopicSeasonProblem} from './entities/group-topic-season-problem.entity'
import {CreateGroupTopicSeasonProblemInput} from './dto/create-group-topic-season-problem.input'
import {UpdateGroupTopicSeasonProblemInput} from './dto/update-group-topic-season-problem.input'
import {Problem} from "../problem/entities/problem.entity";

@Resolver(() => GroupTopicSeasonProblem)
export class GroupTopicSeasonProblemResolver {
    constructor(
        private readonly groupTopicSeasonProblemService: GroupTopicSeasonProblemService,
    ) {
    }

    @Mutation(() => GroupTopicSeasonProblem)
    createGroupTopicSeasonProblem(
        @Args('createGroupTopicSeasonProblemInput')
            createGroupTopicSeasonProblemInput: CreateGroupTopicSeasonProblemInput,
    ) {
        return this.groupTopicSeasonProblemService.create(
            createGroupTopicSeasonProblemInput,
        )
    }

    @Query(() => [GroupTopicSeasonProblem], {name: 'groupTopicSeasonProblem'})
    findAll() {
        return this.groupTopicSeasonProblemService.findAll()
    }

    @Query(() => GroupTopicSeasonProblem, {name: 'groupTopicSeasonProblem'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.groupTopicSeasonProblemService.findOne(id)
    }

    @Mutation(() => GroupTopicSeasonProblem)
    updateGroupTopicSeasonProblem(
        @Args('updateGroupTopicSeasonProblemInput')
            updateGroupTopicSeasonProblemInput: UpdateGroupTopicSeasonProblemInput,
    ) {
        // return this.groupTopicSeasonProblemService.update(
        //   updateGroupTopicSeasonProblemInput.id,
        //   updateGroupTopicSeasonProblemInput,
        // )
    }

    @Mutation(() => GroupTopicSeasonProblem)
    removeGroupTopicSeasonProblem(@Args('id', {type: () => Int}) id: number) {
        return this.groupTopicSeasonProblemService.remove(id)
    }

    @ResolveField(() => Problem)
    problem(@Parent() groupTopicSeasonProblem: GroupTopicSeasonProblem) {
        return groupTopicSeasonProblem.problem
    }
}
