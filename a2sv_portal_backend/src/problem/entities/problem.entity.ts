import { Field, ObjectType } from '@nestjs/graphql'
import { SeasonTopicProblem } from '../../season-relations/season-topic-problem/entities/season-topic-problem.entity'
import { Tag } from '../../tag/entities/tag.entity'
import { Topic } from '../../topic/entities/topic.entity'
import { Contest } from '../../contest/entities/contest.entity'
import { UserContestProblem } from '../../user-relations/user-season-contest-problem/entities/user-season-contest-problem.entity'

@ObjectType()
export class Problem {
  @Field(() => String, { description: 'Id of the problem' })
  id: string

  @Field({ description: 'Title of the problem' })
  title: string

  @Field({ description: 'The platform the problem is from' })
  platform: string

  @Field({ description: 'Link of the question' })
  link: string

  @Field({ description: 'Difficulty of the question' })
  difficulty: string

  @Field(() => [Tag], { description: 'Tag of the question' })
  tags: Tag[]

  @Field()
  topicId: string

  @Field(() => Topic, {nullable: true})
  topic?: Topic

  @Field(() => [Contest], {nullable: true})
  contests?: Contest[]

  @Field(() => [SeasonTopicProblem], {
     nullable: true,
    description: 'Season and topic the problem belongs too',
  })
  seasonTopicProblems?: SeasonTopicProblem[]

  @Field(() => [UserContestProblem], {
    nullable: true,
    description: 'Season and topic the problem belongs too',
  })
  userContestProblems?: UserContestProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
