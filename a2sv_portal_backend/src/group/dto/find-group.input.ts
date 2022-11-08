import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GroupWhereInput {
  @Field(() => String, { nullable: true })
  id?: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
  @Field(() => String, { nullable: true })
  seasonId?: string
  @Field(() => String, { nullable: true })
  topicId?: string
  @Field(() => String, { nullable: true })
  headId?: string
}
