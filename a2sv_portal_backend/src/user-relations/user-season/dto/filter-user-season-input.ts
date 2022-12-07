import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterUserSeasonInput {
  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  seasonId?: string
}