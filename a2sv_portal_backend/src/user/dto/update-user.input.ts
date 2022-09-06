import { CreateUserInput } from './create-user.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { RoleEnum } from 'src/roles/interfaces/role.enum'
import { UpdateGroupInput } from 'src/groups/dto/update-group.input'

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number
  @Field(() => Int,{nullable: true})
  groupId?: number

  @Field({nullable: true})
  email: string

  @Field({nullable: true})
  password: string

  @Field(() => RoleEnum, {nullable:true})
  role: RoleEnum

  @Field(() => UpdateGroupInput, { nullable: true })
  group?: UpdateGroupInput
}
