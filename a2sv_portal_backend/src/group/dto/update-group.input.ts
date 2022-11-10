import { Field, InputType } from '@nestjs/graphql'
import { UpdateUserInput } from 'src/user/dto/update-user.input'
import { UpdateSeasonInput } from '../../season/dto/update-season.input'

@InputType()
export class UpdateGroupInput {
  @Field(() => String)
  id: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
  @Field({ nullable: true })
  headId?: string
}
