import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
import { RoleEnum } from '../../roles/interfaces/role.enum'

@ObjectType()
export class User {
  @Field(() => ID)
  id: number

  @Field(() => RoleEnum)
  role: RoleEnum

  @Field({})
  email: string

  @Field((type) => Status)
  status: Status
}

registerEnumType(Status, {
  name: 'Status',
})
