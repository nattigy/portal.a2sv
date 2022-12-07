import { Field, InputType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '../../user/entities/comfort-level.enum'

@InputType()
export class FilterUserSeasonTopicInput {
  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  topicId?: string

  @Field({ nullable: true })
  groupId?: string

  @Field(() => ComfortLevelEnum, {
    defaultValue: ComfortLevelEnum.UNCOMFORTABLE,
    nullable: true,
  })
  comfortLevel?: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE
}
