import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupUserGroupSeasonInput {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string
}

@InputType()
export class UserGroupSeasonId {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string
}
