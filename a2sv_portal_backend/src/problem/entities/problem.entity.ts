import { Field, ObjectType } from '@nestjs/graphql'
import { Tag } from '../../tag/entities/tag.entity'

@ObjectType()
export class Problem {
  @Field({ description: 'Id of the problem' })
  id: string

  @Field({ description: 'Title of the problem' })
  title: string

  @Field({ description: 'The platform the problem is from' })
  platform: string

  @Field({ description: 'Link of the question' })
  link: string

  @Field({ description: 'Difficulty of the question' })
  difficulty: string

  @Field(() => [Tag], { description: 'Tag of the question' })
  tags: Tag[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
