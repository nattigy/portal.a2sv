import { Field, InputType, Int } from '@nestjs/graphql'
import { UpdateUserInput } from 'src/user/dto/update-user.input'

@InputType()
export class CreateGroupInput {
  @Field()
  name: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
}
