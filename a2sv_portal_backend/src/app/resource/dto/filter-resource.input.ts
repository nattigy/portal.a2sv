import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterResourceInput {
  @Field({ nullable: true })
  id?: string
  
  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  link?: string

  
}
