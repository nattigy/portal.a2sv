import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupInput {
  @Field()
  name: string
  @Field({ nullable: true })
  country: string
  @Field({ nullable: true })
  school?: string
  @Field({ nullable: true })
  headId?: string
}
