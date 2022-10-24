import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Season} from "../../season/entities/season.entity";
import {SeasonTopicProblem} from "../../season-topic-problem/entities/season-topic-problem.entity";
import {Topic} from "../../topic/entities/topic.entity";

@ObjectType()
export class SeasonTopic {
    @Field({description: 'season id of the season'})
    seasonId: string
    @Field({description: 'topic id of the topic'})
    topicId: string
    @Field(() => Season, {nullable: true})
    season?: Season
    @Field({nullable: true})
    topic?: Topic
    @Field(() => [SeasonTopicProblem], {nullable: true})
    problems?: SeasonTopicProblem[]
    @Field(() => Date)
    startDate: Date
    @Field(() => Date)
    endDate: Date
}
