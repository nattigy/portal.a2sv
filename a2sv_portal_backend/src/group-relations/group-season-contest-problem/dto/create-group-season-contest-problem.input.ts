import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateGroupSeasonContestProblemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
