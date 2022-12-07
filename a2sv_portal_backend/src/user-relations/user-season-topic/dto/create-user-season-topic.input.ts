import { Field, InputType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '../../user/entities/comfort-level.enum'

@InputType()
export class CreateUserSeasonTopicInput {
  @Field()
  userId: string

  @Field()
  topicId: string

  @Field(() => ComfortLevelEnum, { defaultValue: ComfortLevelEnum.UNCOMFORTABLE })
  comfortLevel: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE
}
