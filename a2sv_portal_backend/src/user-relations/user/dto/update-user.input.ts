import { Field, InputType } from '@nestjs/graphql'
import { RoleEnum } from '@prisma/client'

@InputType()
export class UpdateUserInput {
  @Field()
  id: string

  @Field( { nullable: true })
  groupId?: string

  @Field({ nullable: true })
  email?: string

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum
}
