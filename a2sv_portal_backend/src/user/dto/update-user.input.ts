import { Field, InputType } from '@nestjs/graphql'
import { RoleEnum } from '@prisma/client'

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: string
  @Field(() => String, { nullable: true })
  groupId?: string
  @Field({ nullable: true })
  email?: string
  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum
}
