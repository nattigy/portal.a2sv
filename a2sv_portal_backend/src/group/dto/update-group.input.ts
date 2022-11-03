import { Field, InputType } from '@nestjs/graphql'
import { UpdateUserInput } from 'src/user/dto/update-user.input'
import { Season } from '../../season/entities/season.entity'
import { UpdateSeasonInput } from '../../season/dto/update-season.input'

@InputType()
export class UpdateGroupInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
  @Field(() => String)
  id: string
  @Field(() => [UpdateSeasonInput], { nullable: true })
  seasons?: UpdateSeasonInput[]
  @Field(() => [UpdateUserInput], { nullable: true })
  users?: UpdateUserInput[]
  @Field({ nullable: true })
  headId?: string
  @Field(() => UpdateUserInput, { nullable: true })
  head?: UpdateUserInput
  @Field({ nullable: true })
  currentSeasonId?: string
}
