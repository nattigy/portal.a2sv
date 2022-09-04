import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
import { RoleEnum } from '../../roles/interfaces/role.enum'
@InputType()
export class CreateUserInput {
  @Field({})
  email: string

  @Field({})
  password: string

  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT })
  role: RoleEnum
}

registerEnumType(Status, {
  name: 'Status',
})
