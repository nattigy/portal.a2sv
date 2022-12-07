import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'

@InputType()
export class FilterUserInput {
  @Field({ nullable: true })
  id?: string

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum

  @Field({ nullable: true })
  email?: string

  @Field(() => StatusEnum, { nullable: true })
  status?: StatusEnum

  @Field(() => String, { nullable: true })
  groupId?: string

  @Field(() => String, { nullable: true })
  userProfilesId?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date
}

@InputType()
export class UniqueUserInput {
  
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  email?: string

}