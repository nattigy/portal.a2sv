import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, Status } from '@prisma/client'
import { WhereUserFilter } from './where-user.filter'

@ArgsType()
export class GetUserArgs {
  @Field({ nullable: true })
  id?: string
  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => Int, { nullable: true })
  take?: number

  @Field({ name: 'status', nullable: true })
  status?: Status

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ name: 'role', nullable: true })
  role?: RoleEnum

  // @Field(() => WhereUserFilter, { nullable: true })
  // where: typeof WhereUserFilter
}

registerEnumType(Status, {
  name: 'status',
})
registerEnumType(RoleEnum, {
  name: 'role',
})
