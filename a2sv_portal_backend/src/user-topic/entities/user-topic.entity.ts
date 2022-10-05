import {Field, Int, ObjectType} from '@nestjs/graphql';
import {ComfortLevel} from "../../user/entities/comfort-level.enum";
import {User} from "../../user/entities/user.entity";
import {Topic} from "../../topic/entities/topic.entity";

@ObjectType()
export class UserTopic {
    @Field(() => Int)
    userId: number
    @Field(() => Int)
    topicId: number
    @Field(() => ComfortLevel, {defaultValue: ComfortLevel.UNCOMFORTABLE})
    comfortLevel: ComfortLevel = ComfortLevel.UNCOMFORTABLE
    @Field(() => Topic, {nullable: true})
    topic?: Topic
    @Field(() => User, {nullable: true})
    user?: User

}
