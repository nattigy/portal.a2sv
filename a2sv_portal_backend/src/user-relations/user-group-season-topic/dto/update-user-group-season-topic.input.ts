import { Field, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateUserGroupSeasonTopicInput,
  UserGroupSeasonTopicId,
} from './create-user-group-season-topic.input'
import { ComfortLevelEnum } from '@prisma/client'

@InputType()
export class UpdateUserGroupSeasonTopicInput extends PartialType(CreateUserGroupSeasonTopicInput) {
  @Field(() => UserGroupSeasonTopicId)
  id: UserGroupSeasonTopicId

  @Field(() => ComfortLevelEnum, {
    defaultValue: ComfortLevelEnum.UNCOMFORTABLE,
    nullable: true,
  })
  comfortLevel?: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE
}
