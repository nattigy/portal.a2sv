import { Field, InputType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'

@InputType()
export class UpdateUserInput {
  @Field()
  userId: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  email?: string

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum

  @Field(() => StatusEnum, { nullable: true })
  status?: StatusEnum
}
