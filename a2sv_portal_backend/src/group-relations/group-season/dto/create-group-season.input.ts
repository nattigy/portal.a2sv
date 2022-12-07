import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupSeasonInput {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field(() => Date)
  startDate: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date
}

@InputType()
export class GroupSeasonId {
  @Field()
  groupId: string

  @Field()
  seasonId: string
}
