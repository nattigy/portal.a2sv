import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Role {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
