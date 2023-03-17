import { Field, InputType } from '@nestjs/graphql'
import { UserGroupSeasonTopicId } from './create-user-group-season-topic.input'
import { ComfortLevelEnum } from '@prisma/client'

@InputType()
export class UpdateUserGroupSeasonTopicInput {
  @Field(() => UserGroupSeasonTopicId)
  id: UserGroupSeasonTopicId

  @Field(() => ComfortLevelEnum)
  comfortLevel: ComfortLevelEnum
}
