import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, Status } from '@prisma/client'

@InputType()
export class CreateUserInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT })
  role: RoleEnum

  @Field({ nullable: true })
  groupId?: string

  @Field(() => Status, { nullable: true, defaultValue: 'ACTIVE' })
  status?: Status
}

registerEnumType(Status, {
  name: 'Status',
})
