import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number
  @Field()
  name: string
}
