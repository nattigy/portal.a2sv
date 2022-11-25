import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterGroupInput {
  @Field(() => String, { nullable: true })
  id?: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
  @Field({ nullable: true })
  headId?: string
}
