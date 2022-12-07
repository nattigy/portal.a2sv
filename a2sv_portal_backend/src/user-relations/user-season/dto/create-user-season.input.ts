import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserSeasonInput {
  @Field()
  userId: string
  @Field()
  seasonId: string
}

@InputType()
export class UserSeasonId {
  @Field()
  userId: string

  @Field()
  seasonId: string
}
