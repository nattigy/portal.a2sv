import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GroupStatResponse {
  @Field(() => String)
  id: string

  @Field()
  name: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  school?: string

  @Field(() => Int)
  numberOfStudents: number

  @Field(() => Int)
  numberOfTopicsCovered: number

  @Field(() => Int)
  topicsCoverage: number

  @Field(() => Int)
  numberOfAcceptedSubmissions: number

  @Field(() => Int)
  numberOfWrongSubmissions: number

  @Field(() => Int)
  totalTimeDedicated: number

  // @Field(() => Int)
  // rank: number

  @Field(() => Int)
  contestsAttended: number

  @Field(() => Int)
  numberOfProblems: number
}
