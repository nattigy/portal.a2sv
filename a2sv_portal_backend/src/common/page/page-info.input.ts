import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PageInfoInput {
  @Field(() => Int)
  limit: number

  @Field(() => Int)
  skip: number
}
