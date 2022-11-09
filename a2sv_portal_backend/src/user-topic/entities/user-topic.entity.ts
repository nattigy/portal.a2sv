import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Topic } from '../../topic/entities/topic.entity'
import { ComfortLevel } from '../../user/entities/comfort-level.enum'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class UserTopic {
  @Field(() => Int)
  userId: number
  @Field(() => Int)
  topicId: number
  @Field(() => ComfortLevel, { defaultValue: ComfortLevel.UNCOMFORTABLE })
  comfortLevel: ComfortLevel = ComfortLevel.UNCOMFORTABLE
  @Field(() => Topic, { nullable: true })
  topic?: Topic
  @Field(() => User, { nullable: true })
  user?: User
}
