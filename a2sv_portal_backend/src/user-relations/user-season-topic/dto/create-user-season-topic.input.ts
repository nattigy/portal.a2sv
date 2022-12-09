import { Field, InputType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '@prisma/client'

@InputType()
export class CreateUserSeasonTopicInput {
  @Field()
  userId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field(() => ComfortLevelEnum, { defaultValue: ComfortLevelEnum.UNCOMFORTABLE })
  comfortLevel: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE
}

@InputType()
export class UserSeasonTopicId {
  @Field()
  userId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string
}
