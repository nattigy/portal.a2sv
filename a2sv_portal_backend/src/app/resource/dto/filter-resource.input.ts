import { Field, InputType } from '@nestjs/graphql'
import { ResourceTypeEnum } from '@prisma/client'

@InputType()
export class FilterResourceInput {
  @Field({ nullable: true })
  id?: string
  
  @Field(()=>ResourceTypeEnum, { nullable: true })
  type?: ResourceTypeEnum

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  link?: string

  
}
