import {Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql'
import {GroupTopicSeasonService} from './group-topic-season.service'
import {GroupTopicSeason} from './entities/group-topic-season.entity'
import {CreateGroupTopicSeasonInput} from './dto/create-group-topic-season.input'
import {UpdateGroupTopicSeasonInput} from './dto/update-group-topic-season.input'
import {Group} from "../group/entities/group.entity";
import {Topic} from "../topic/entities/topic.entity";

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
        return this.groupTopicSeasonService.create(createGroupTopicSeasonInput)
    }

    @Query(() => [GroupTopicSeason], {name: 'groupTopicSeason'})
    findAll() {
        return this.groupTopicSeasonService.findAll()
    }

    @Query(() => GroupTopicSeason, {name: 'groupTopicSeason'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.groupTopicSeasonService.findOne(id)
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
        return this.groupTopicSeasonService.remove(id)
    }

    @ResolveField(() => Group)
    group(@Parent() groupTopic: GroupTopicSeason) {
        return groupTopic.group
    }

    @ResolveField(() => Topic)
    topic(@Parent() groupTopic: GroupTopicSeason) {
        return groupTopic.topic
    }
}
