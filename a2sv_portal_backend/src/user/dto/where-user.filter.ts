import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'

@InputType()
export class WhereUserFilter {
  @Field({ name: 'Status', nullable: true })
  Status: Status

  @Field({ nullable: true })
  email: string
}

registerEnumType(Status, {
  name: 'Status',
})
