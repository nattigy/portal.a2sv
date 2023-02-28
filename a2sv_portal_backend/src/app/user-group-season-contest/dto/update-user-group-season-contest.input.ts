import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateGroupUserGroupSeasonInput } from '../../user-group-season/dto/create-group-user-season.input'

@InputType()
export class UpdateUserGroupSeasonContestInput extends PartialType(
  CreateGroupUserGroupSeasonInput,
) {
  @Field()
  contestId: string

  @Field()
  seasonId: string

  @Field()
  userId: string

  @Field()
  groupId: string

  @Field(() => Int, { nullable: true })
  wrongSubmissions?: number

  @Field(() => Boolean, { nullable: true })
  contestAttended?: boolean

  @Field(() => Int, { nullable: true })
  problemsSolved?: number

  @Field(() => Float, { nullable: true })
  timeSpent?: number
}
