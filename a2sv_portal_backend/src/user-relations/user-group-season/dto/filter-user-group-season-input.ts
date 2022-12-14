import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterUserGroupSeasonInput {
  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  groupId?: string
}
