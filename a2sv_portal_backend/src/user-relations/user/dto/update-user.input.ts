import { Field, InputType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'

@InputType()
export class UpdateUserInput {
  @Field()
  id: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  middleName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  email?: string

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum

  @Field(() => StatusEnum, { nullable: true })
  status?: StatusEnum
}
