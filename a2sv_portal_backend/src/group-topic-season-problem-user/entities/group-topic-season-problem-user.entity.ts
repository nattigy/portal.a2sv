import {ObjectType, Field, Int} from '@nestjs/graphql'
import {User} from '../../user/entities/user.entity'
import {GroupTopicSeasonProblem} from '../../group-topic-season-problem/entities/group-topic-season-problem.entity'

@ObjectType()
export class GroupTopicSeasonProblemUser {
    @Field(() => Int)
    groupId: number
    @Field(() => Int)
    topicId: number
    @Field(() => Int)
    seasonId: number
    @Field(() => Int)
    problemId: number
    @Field(() => Int)
    userId: number
    @Field(() => User, {nullable: true})
    user?: User
    @Field(() => [GroupTopicSeasonProblem], {nullable: true})
    groupTopicSeasonProblems?: GroupTopicSeasonProblem[]
    @Field(() => Boolean, {defaultValue: false})
    solved?: boolean
    @Field({nullable: true})
    solutionLink?: string
    @Field(() => Int, {defaultValue: 0})
    attempts?: number
    @Field(() => Int, {defaultValue: 0})
    timeDedicated?: number
    @Field({defaultValue: false})
    needHelp?: boolean
}
