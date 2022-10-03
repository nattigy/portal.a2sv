import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateGroupTopicSeasonProblemUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
