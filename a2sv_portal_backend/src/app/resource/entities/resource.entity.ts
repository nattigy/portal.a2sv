import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ResourceTypeEnum } from '@prisma/client'

@ObjectType()
export class Resource {
  @Field(() => String)
  id: string

  @Field(() => ResourceTypeEnum)
  type: ResourceTypeEnum

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  link: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
  
  
}

registerEnumType(ResourceTypeEnum, {name: 'ResourceTypeEnum'})