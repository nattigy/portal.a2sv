import { Field, InputType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '@prisma/client'

@InputType()
export class FilterUserGroupSeasonTopicInput {
  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  topicId?: string

  @Field({ nullable: true })
  groupId?: string

  @Field(() => ComfortLevelEnum, { nullable: true })
  comfortLevel?: ComfortLevelEnum
}
