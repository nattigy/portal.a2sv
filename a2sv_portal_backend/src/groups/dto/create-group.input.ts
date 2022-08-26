import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateGroupInput {
  @Field()
  name: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
}
