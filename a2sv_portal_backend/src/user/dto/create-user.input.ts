import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
import { CreateGroupInput } from 'src/groups/dto/create-group.input'
import { UpdateGroupInput } from 'src/groups/dto/update-group.input'
import { RoleEnum } from '../../roles/interfaces/role.enum'
@InputType()
export class CreateUserInput {
  @Field({})
  email: string

  @Field({})
  password: string

  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT })
  role: RoleEnum

  @Field(() => UpdateGroupInput, { nullable: true })
  group?: UpdateGroupInput

}

registerEnumType(Status, {
  name: 'Status',
})
