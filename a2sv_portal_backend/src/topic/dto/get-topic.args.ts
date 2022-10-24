import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class GetTopicArgs {
  @Field(() => Int, { nullable: true })
  skip: number

  @Field(() => Int, { nullable: true })
  take: number

  @Field(() => String, { nullable: true })
  seasonId?: string

  @Field(() => String, { nullable: true })
  groupId?: string
}
