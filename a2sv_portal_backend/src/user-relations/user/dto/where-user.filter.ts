import { Field, InputType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'

@InputType()
export class WhereUserFilter {
  @Field({ nullable: true })
  status?: StatusEnum

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  role?: RoleEnum
}

