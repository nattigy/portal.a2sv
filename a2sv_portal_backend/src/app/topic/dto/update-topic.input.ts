import { Field, InputType} from '@nestjs/graphql'
import { CreateResourceInput } from 'src/app/resource/dto/create-resource.input'

@InputType()
export class UpdateTopicInput {
  @Field()
  topicId: string

  @Field()
  name?: string

  @Field()
  description?: string

  @Field(() => [CreateResourceInput])
  resources?: CreateResourceInput[]
}
