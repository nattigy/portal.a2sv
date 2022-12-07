import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, Status } from '@prisma/client'

@InputType()
export class WhereUserFilter {
  @Field({ name: 'status', nullable: true })
  status?: Status

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  role?: string
}

registerEnumType(Status, {
  name: 'Status',
})
registerEnumType(RoleEnum, {
  name: 'Role',
})
