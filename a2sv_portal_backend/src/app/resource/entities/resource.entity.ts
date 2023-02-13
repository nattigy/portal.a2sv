import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Resource {
  @Field(() => String)
  id: string

  @Field()
  type: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  link: string
}
