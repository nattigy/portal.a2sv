import { ArgsType, Field, Int } from '@nestjs/graphql'
import { WhereUserFilter } from './where-user.filter'

@ArgsType()
export class GetUserArgs {
  @Field(() => Int, { nullable: true })
  skip: number

  @Field(() => Int, { nullable: true })
  take: number

  @Field(() => WhereUserFilter, { nullable: true })
  where: typeof WhereUserFilter
}
