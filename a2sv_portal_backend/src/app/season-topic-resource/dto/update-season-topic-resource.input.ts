import { Field, InputType, PartialType } from '@nestjs/graphql'
import { ResourceTypeEnum } from '@prisma/client'

@InputType()
export class UpdateSeasonTopicResourceInput {
  @Field()
  seasonId: string

  @Field()
  topicId: string
  
  @Field(() => ResourceTypeEnum, {nullable:true})
  type?: ResourceTypeEnum

  @Field({nullable:true})
  name?: string

  @Field({nullable:true})
  description?: string

  @Field({nullable:true})
  link?: string
}
