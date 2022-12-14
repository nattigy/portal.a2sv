import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserGroupSeasonContestInput {
  @Field()
  contestId: string

  @Field()
  seasonId: string

  @Field()
  userId: string
}

@InputType()
export class UserGroupSeasonContestId {
  @Field()
  contestId: string

  @Field()
  seasonId: string

  @Field()
  userId: string
}
