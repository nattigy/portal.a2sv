import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'

@ObjectType()
export class User {
  @Field(() => ID)
  id: number

  @Field(() => ID)
  roleId: number

  @Field({})
  email: string

  @Field((type) => Status)
  status: Status
}

registerEnumType(Status, {
  name: 'Status',
})
