import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupSeasonInput {
  @Field()
  groupId: string

  @Field()
  seasonId: string
}

@InputType()
export class GroupSeasonId {
  @Field()
  groupId: string

  @Field()
  seasonId: string
}
