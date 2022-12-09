import { Field, InputType } from '@nestjs/graphql'
import { JoinRequestEnum } from '@prisma/client'

@InputType()
export class FilterGroupSeasonInput {
  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  isActive?: boolean

  @Field({ nullable: true })
  headId?: string

  @Field(() => JoinRequestEnum, { nullable: true })
  joinRequest?: JoinRequestEnum

  @Field(() => Date, { nullable: true })
  startDate?: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date
}
