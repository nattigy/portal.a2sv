import { Field, InputType} from '@nestjs/graphql'
import { CreateResourceInput } from 'src/app/resource/dto/create-resource.input'

@InputType()
export class UpdateTopicInput {
  @Field()
  topicId: string

  @Field({nullable:true})
  name?: string

  @Field({nullable:true})
  description?: string

  @Field(() => [CreateResourceInput], {nullable:true})
  resources?: CreateResourceInput[]
}
