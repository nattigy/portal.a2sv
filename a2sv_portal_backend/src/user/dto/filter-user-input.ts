import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, Status } from '@prisma/client'

@InputType()
export class FilterUserInput {
  @Field({ nullable: true })
  id?: string
  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum
  @Field({ nullable: true })
  email?: string
  @Field(() => Status, { nullable: true })
  status?: Status
  @Field(() => String, { nullable: true })
  groupId?: string
  @Field(() => String, { nullable: true })
  userProfilesId?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}

registerEnumType(Status, {
  name: 'status',
})
registerEnumType(RoleEnum, {
  name: 'role',
})
