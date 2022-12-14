import { Field, InputType, PartialType } from '@nestjs/graphql'
import { UserSeasonContestId } from './create-user-season-contest.input'
import { CreateGroupUserSeasonInput } from '../../user-group-season/dto/create-group-user-season.input'

@InputType()
export class UpdateUserSeasonContestInput extends PartialType(CreateGroupUserSeasonInput) {
  @Field(() => UserSeasonContestId)
  id: UserSeasonContestId
}
