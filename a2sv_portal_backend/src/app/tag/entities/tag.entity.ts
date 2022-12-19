import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field(() => String)
  id: string

  @Field()
  name: string

  // @Field(() => [Problem], { nullable: true })
  // problems?: Problem[]
}
