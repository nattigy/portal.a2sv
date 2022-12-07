import { Field, ObjectType } from '@nestjs/graphql'
import { Topic } from '../../../topic/entities/topic.entity'
import { User } from '../../user/entities/user.entity'
import { ComfortLevel } from '@prisma/client'
import { ComfortLevelEnum } from '../../user/entities/comfort-level.enum'

@ObjectType()
export class UserSeasonTopic {
  @Field()
  userId: string

  @Field()
  topicId: string

  @Field(() => ComfortLevelEnum, { defaultValue: ComfortLevel.UNCOMFORTABLE })
  comfortLevel: ComfortLevel = ComfortLevel.UNCOMFORTABLE

  @Field(() => Topic, { nullable: true })
  topic?: Topic

  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
