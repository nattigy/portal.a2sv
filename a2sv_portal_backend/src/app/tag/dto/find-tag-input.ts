import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterTagInput {
  @Field({ nullable: true })
  name?: string
}
