import {Field, InputType} from '@nestjs/graphql';
import {UpdateProblemInput} from "../../problem/dto/update-problem.input";

@InputType()
export class CreateContestInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  link: string;
  @Field(() => String)
  div: string;
  @Field(() => Date)
  startTime: Date;
  @Field(() => Date)
  endTime: Date;
  @Field(() => [UpdateProblemInput])
  problems: UpdateProblemInput[]
}
