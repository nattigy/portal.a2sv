import {Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql'
import {GroupTopicSeasonService, GroupTopicSeasonWhereInput} from './group-topic-season.service'
import {GroupTopicSeason} from './entities/group-topic-season.entity'
import {CreateGroupTopicSeasonInput} from './dto/create-group-topic-season.input'
import {UpdateGroupTopicSeasonInput} from './dto/update-group-topic-season.input'
import {Group} from "../group/entities/group.entity";
import {Topic} from "../topic/entities/topic.entity";
import {Season} from "../season/entities/season.entity";
import {Problem} from "../problem/entities/problem.entity";
import {GroupTopicSeasonProblem} from "../group-topic-season-problem/entities/group-topic-season-problem.entity";

@Resolver(() => GroupTopicSeason)
export class GroupTopicSeasonResolver {
    constructor(
        private readonly groupTopicSeasonService: GroupTopicSeasonService,
    ) {
    }

    @Mutation(() => GroupTopicSeason)
    createGroupTopicSeason(
        @Args('createGroupTopicSeasonInput')
            createGroupTopicSeasonInput: CreateGroupTopicSeasonInput,
    ) {
        return this.groupTopicSeasonService.createGroupTopicSeason(createGroupTopicSeasonInput)
    }

    @Query(() => [GroupTopicSeason], {name: 'groupTopicSeason', nullable: true})
    groupTopicSeasons(@Args('filter', {type: () => GroupTopicSeasonWhereInput}) filter: GroupTopicSeasonWhereInput) {
        return this.groupTopicSeasonService.groupTopicSeasons(filter)
    }

    @Query(() => GroupTopicSeason, {name: 'groupTopicSeason', nullable: true})
    groupTopicSeason(@Args('groupId', {type: () => Int}) groupId: number, @Args('topicId', {type: () => Int}) topicId: number, @Args('seasonId', {type: () => Int}) seasonId: number) {
        return this.groupTopicSeasonService.groupTopicSeason(groupId, topicId, seasonId)
    }

    @Mutation(() => GroupTopicSeason)
    updateGroupTopicSeason(
        @Args('updateGroupTopicSeasonInput')
            updateGroupTopicSeasonInput: UpdateGroupTopicSeasonInput,
    ) {
        // return this.groupTopicSeasonService.update(
        //   updateGroupTopicSeasonInput.id,
        //   updateGroupTopicSeasonInput,
        // )
    }

    @Mutation(() => GroupTopicSeason)
    removeGroupTopicSeason(@Args('id', {type: () => Int}) id: number) {
        return this.groupTopicSeasonService.removegroupTopicSeason(id)
    }

    @ResolveField(() => Group)
    group(@Parent() groupTopic: GroupTopicSeason) {
        return groupTopic.group
    }

    @ResolveField(() => Topic)
    topic(@Parent() groupTopic: GroupTopicSeason) {
        return groupTopic.topic
    }

    @ResolveField(() => Season)
    season(@Parent() groupTopic: GroupTopicSeason) {
        return groupTopic.season
    }

    @ResolveField(() => [GroupTopicSeasonProblem])
    problems(@Parent() groupTopicSeason: GroupTopicSeason) {
        return groupTopicSeason.problems
    }
}
