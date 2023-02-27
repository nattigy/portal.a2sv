import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateContestInput } from '../../contest/dto/create-contest.input'

@InputType()
export class UpdateTopicInput extends PartialType(CreateContestInput) {
  @Field()
  topicId: string
}
