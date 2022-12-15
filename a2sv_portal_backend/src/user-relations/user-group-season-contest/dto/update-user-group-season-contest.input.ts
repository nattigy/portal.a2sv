import { Field, InputType, PartialType } from '@nestjs/graphql'
import { UserGroupSeasonContestId } from './create-user-group-season-contest.input'
import { CreateGroupUserGroupSeasonInput } from '../../user-group-season/dto/create-group-user-season.input'

@InputType()
export class UpdateUserGroupSeasonContestInput extends PartialType(CreateGroupUserGroupSeasonInput) {
  @Field(() => UserGroupSeasonContestId)
  id: UserGroupSeasonContestId
}
