import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterProblemInput {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  title?: string
  @Field({ nullable: true })
  platform?: string
  @Field({ nullable: true })
  link?: string
  @Field({ nullable: true })
  difficulty?: string
  @Field(() => [String], { nullable: true })
  tags?: string[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}