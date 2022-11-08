import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class contestLeaderboardInput {
  @Field(() => String, { nullable: true })
  groupId?: string
  @Field(() => String)
  contestId: string
}
