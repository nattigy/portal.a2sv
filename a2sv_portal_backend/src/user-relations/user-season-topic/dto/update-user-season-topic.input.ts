import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateUserSeasonTopicInput, UserSeasonTopicId } from './create-user-season-topic.input'
import { ComfortLevelEnum } from '@prisma/client'

@InputType()
export class UpdateUserSeasonTopicInput extends PartialType(CreateUserSeasonTopicInput) {
  @Field(() => UserSeasonTopicId)
  id: UserSeasonTopicId

  @Field(() => ComfortLevelEnum, {
    defaultValue: ComfortLevelEnum.UNCOMFORTABLE,
    nullable: true,
  })
  comfortLevel?: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE
}
