import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Mail {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
