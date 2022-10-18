import {CreateGroupTopicSeasonProblemInput} from './create-group-topic-season-problem.input'
import {Field, InputType, Int, PartialType} from '@nestjs/graphql'

@InputType()
export class UpdateGroupTopicSeasonProblemInput extends PartialType(
    CreateGroupTopicSeasonProblemInput,
) {
    @Field(() => Int)
    problemId: number
    @Field(() => Int)
    groupId: number
    @Field(() => Int)
    topicId: number
    @Field(() => Int)
    seasonId: number
}
