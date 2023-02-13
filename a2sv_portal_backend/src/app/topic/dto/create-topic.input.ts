import { Field, InputType } from '@nestjs/graphql'
import { CreateResourceInput } from 'src/app/resource/dto/create-resource.input'

@InputType()
export class CreateTopicInput {
  @Field()
  name: string

  @Field({nullable: true})
  description?: string

  @Field(() => [CreateResourceInput])
  resources?: CreateResourceInput[]

}
