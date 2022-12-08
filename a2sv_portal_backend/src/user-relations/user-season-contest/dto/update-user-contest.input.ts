import { Field, InputType, PartialType } from '@nestjs/graphql'
import { UserSeasonContestId } from './create-user-contest.input'
import { CreateUserSeasonInput } from '../../user-season/dto/create-user-season.input'

@InputType()
export class UpdateUserContestInput  extends PartialType(CreateUserSeasonInput){
  @Field(() => UserSeasonContestId)
  id: UserSeasonContestId
}

