import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class GroupWhereInput {
  @Field(() => Int, {nullable: true})
  id?: number
  @Field({nullable: true})
  name?: string
  @Field({nullable: true})
  country?: string
  @Field({nullable: true})
  school?: string
  @Field(() => Int, {nullable: true})
  seasonId?: number
  @Field(() => Int, {nullable: true})
  topicId?: number
  @Field(() => Int, {nullable: true})
  headId?: number
  @Field(() => Int, {nullable: true})
  take?: number
  @Field(() => Int, {nullable: true})
  skip?: number
}