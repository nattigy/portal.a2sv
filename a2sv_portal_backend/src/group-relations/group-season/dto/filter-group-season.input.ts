import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterGroupSeasonInput {
  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  seasonId?: string
}