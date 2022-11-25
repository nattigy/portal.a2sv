import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateUserTopicInput } from './create-user-topic.input'
import { ComfortLevelEnum } from '../../user/entities/comfort-level.enum'

@InputType()
export class UpdateUserTopicInput extends PartialType(CreateUserTopicInput) {
  @Field()
  userId: string
  @Field()
  topicId: string
  @Field(() => ComfortLevelEnum, {
    defaultValue: ComfortLevelEnum.UNCOMFORTABLE,
    nullable: true,
  })
  comfortLevel?: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE
}

@InputType()
export class UserTopicId {
  @Field()
  userId: string
  @Field()
  topicId: string
}
