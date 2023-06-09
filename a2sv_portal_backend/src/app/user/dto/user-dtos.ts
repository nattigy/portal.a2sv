import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StudentStat {
  @Field(() => Float)
  acceptanceRate: number

  @Field(() => Int)
  numberOfCorrectSubmissions: number

  @Field(() => Int)
  numberOfIncorrectSubmissions: number

  @Field(() => Int)
  totalTimeDedicated: number

  @Field(() => Float)
  unComfortability: number

  @Field(() => Int)
  easyCount: number

  @Field(() => Int)
  mediumCount: number

  @Field(() => Int)
  hardCount: number

  @Field(() => Int)
  totalUsers: number

  @Field(() => Int)
  weeklyRank

  @Field(() => Int)
  monthlyRank

  @Field(() => Int)
  allTimeRank
}

@InputType()
export class TopicStudentStatInput {
  @Field()
  studentId: string

  @Field()
  seasonId: string
}

@ObjectType()
export class EachTopicCoverageStat {
  @Field()
  topicId: string

  @Field(() => Float)
  topicCoverage: number
}

@ObjectType()
export class TopicCoverageStat {
  @Field(() => [EachTopicCoverageStat])
  eachTopicCoverageStat: EachTopicCoverageStat[]

  @Field(() => Float)
  totalTopicCoverage: number

  @Field(() => Float)
  unComfortability: number
}

@ObjectType()
export class EachContestConversionRate {
  @Field()
  contestId: string

  @Field(() => Float)
  conversionRate: number
}

@ObjectType()
export class ContestConversionRate {
  @Field(() => [EachContestConversionRate])
  eachContestConversionRate: EachContestConversionRate[]

  @Field(() => Float)
  totalContestConversionRate: number
}
