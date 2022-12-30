import { Field, InputType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '@prisma/client'

@InputType()
export class CreateUserGroupSeasonTopicInput {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field(() => ComfortLevelEnum, { defaultValue: ComfortLevelEnum.UNCOMFORTABLE })
  comfortLevel: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE
}

@InputType()
export class UserGroupSeasonTopicId {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string
}
