import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, Status } from '@prisma/client'
import { WhereUserFilter } from './where-user.filter'

@ArgsType()
export class GetUserArgs {
  @Field(() => Int, { nullable: true })
  skip: number

  @Field(() => Int, { nullable: true })
  take: number

  @Field({ name: 'Status', nullable: true })
  Status: Status

  @Field({ nullable: true })
  email: string
  
  @Field({ nullable: true })
  groupId: Number

  @Field({name:'Role', nullable: true })
  role: RoleEnum

  // @Field(() => WhereUserFilter, { nullable: true })
  // where: typeof WhereUserFilter
}

registerEnumType(Status, {
  name: 'Status',
})
registerEnumType(RoleEnum, {
  name: 'Role',
})
