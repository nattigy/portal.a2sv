import { CreateGroupSeasonInput } from './create-group-season.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'
import { JoinRequestEnum } from '@prisma/client'

@InputType()
export class UpdateGroupSeasonInput extends PartialType(CreateGroupSeasonInput) {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field({ nullable: true })
  isActive?: boolean
}

@InputType()
export class UpdateGroupSeasonJoinRequestInput {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field(() => JoinRequestEnum, { nullable: true })
  joinRequest?: JoinRequestEnum
}
