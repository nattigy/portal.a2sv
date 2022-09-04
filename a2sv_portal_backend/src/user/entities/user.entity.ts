import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
import { Group } from 'src/groups/entities/group.entity'
import { RoleEnum } from '../../roles/interfaces/role.enum'

@ObjectType()
export class User {
  @Field(() => ID)
  id: number

  @Field(() => RoleEnum)
  role: RoleEnum

  @Field({})
  email: string

  @Field(() => Status)
  status: Status

  @Field(() => Group, { nullable: true })
  group?: Group

  @Field(() => Int)
  groupId?: number
}

registerEnumType(Status, {
  name: 'Status',
})
