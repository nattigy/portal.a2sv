import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'

@InputType()
export class WhereUserFilter {
  @Field({ name: 'status', nullable: true })
  statusEnum?: StatusEnum

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  role?: string
}

registerEnumType(StatusEnum, {
  name: 'Status',
})
registerEnumType(RoleEnum, {
  name: 'Role',
})
