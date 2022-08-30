import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { Status } from './Status';
@InputType()
export class CreateUserInput {
  @Field({})
  email : string;

  @Field({})
  password: string;

  @Field(type => Status)
  status: Status
}

registerEnumType(Status, {
  name: "Status"
})
