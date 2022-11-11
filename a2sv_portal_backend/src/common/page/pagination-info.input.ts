import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PaginationInfoInput {
  @Field(() => Int)
  take?: number

  @Field(() => Int)
  skip?: number
}
