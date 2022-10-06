import {ObjectType, Field, Int} from '@nestjs/graphql'
import {Group} from '../../group/entities/group.entity'
import {Season} from '../../season/entities/season.entity'
import {Topic} from '../../topic/entities/topic.entity'
import {User} from "../../user/entities/user.entity";
import {GroupTopicSeasonProblem} from "../../group-topic-season-problem/entities/group-topic-season-problem.entity";

@ObjectType()
export class GroupTopicSeason {
    @Field(() => Int)
    groupId: number
    @Field(() => Int)
    topicId: number
    @Field(() => Int)
    seasonId: number
    @Field(() => Group, {nullable: true})
    group?: Group
    @Field(() => Topic, {nullable: true})
    topic?: Topic
    @Field(() => Season, {nullable: true})
    season?: Season
    @Field(() => [GroupTopicSeasonProblem], {nullable: true})
    problems?: GroupTopicSeasonProblem[]
}
