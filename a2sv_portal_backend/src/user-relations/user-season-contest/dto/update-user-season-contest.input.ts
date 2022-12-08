import { Field, InputType, PartialType } from '@nestjs/graphql'
import { UserSeasonContestId } from './create-user-season-contest.input'
import { CreateUserSeasonInput } from '../../user-season/dto/create-user-season.input'

@InputType()
export class UpdateUserSeasonContestInput extends PartialType(CreateUserSeasonInput){
  @Field(() => UserSeasonContestId)
  id: UserSeasonContestId
}

