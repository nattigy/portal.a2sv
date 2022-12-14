import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserSeasonContestInput {
  @Field()
  contestId: string

  @Field()
  seasonId: string

  @Field()
  userId: string
}

@InputType()
export class UserSeasonContestId {
  @Field()
  contestId: string

  @Field()
  seasonId: string

  @Field()
  userId: string
}
