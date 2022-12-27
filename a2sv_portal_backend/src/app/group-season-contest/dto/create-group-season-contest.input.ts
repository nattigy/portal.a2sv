import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupSeasonContestInput {
  @Field({ description: 'Example field' })
  seasonId: string

  @Field({ description: 'Example field' })
  contestId: string

  @Field({ description: 'Example field' })
  groupId: string
}

@InputType()
export class GroupSeasonContestId {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  contestId: string
}
