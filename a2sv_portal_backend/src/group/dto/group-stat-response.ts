import {Field, ID, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class GroupStatResponse {
  /*
  1. Topics covered
  2. Number of problems solved
  3. Topics students struggling with
  4. Total time dedicated
  5. Number of correct submission
  6. Number of incorrect submission
  7.# Consistency chart of each group
  8. Rank of group
  9.# Contest stats
  11. Number of contests attended */

  @Field(() => String)
  id: string

  @Field()
  name: string

  @Field()
  createdAt: Date

  @Field({nullable: true})
  country?: string

  @Field({nullable: true})
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