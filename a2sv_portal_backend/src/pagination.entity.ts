import { createUnionType } from '@nestjs/graphql'
import { Contest } from './contest/entities/contest.entity'
import { GroupContest } from './group-contest/entities/group-contest.entity'
import { Group } from './group/entities/group.entity'
import { Problem } from './problem/entities/problem.entity'
import {
  SeasonTopicProblemUserId
} from './season-topic-problem-user/dto/season-topic-problem-user.id'
import {
  SeasonTopicProblemUser
} from './season-topic-problem-user/entities/season-topic-problem-user.entity'
import {
  SeasonTopicProblem
} from './season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopic } from './season-topic/entities/season-topic.entity'
import { Season } from './season/entities/season.entity'
import { Topic } from './topic/entities/topic.entity'
import {
  UserContestProblem
} from './user-contest-problem/entities/user-contest-problem.entity'
import { UserContest } from './user-contest/entities/user-contest.entity'
import { UserTopic } from './user-topic/entities/user-topic.entity'
import { User } from './user/entities/user.entity'

export class PaginationEntity {
  take?: number
  skip?: number
}

export const Entity = createUnionType({
  name: 'Entity',
  types: () => [Contest, UserContest, UserContestProblem, GroupContest, User, Group, Topic, Season, Problem, UserTopic, SeasonTopic, SeasonTopicProblem, SeasonTopicProblemUser],
  resolveType(value) {
    if (value as Contest) return Contest
    if (value as UserContest) return UserContest
    if (value as UserContestProblem) return UserContestProblem
    if (value as GroupContest) return GroupContest
    if (value as User) return User
    if (value as Group) return Group
    if (value as Topic) return Topic
    if (value as Season) return Season
    if (value as Problem) return Problem
    if (value as UserTopic) return UserTopic
    if (value as SeasonTopic) return SeasonTopic
    if (value as SeasonTopicProblem) return SeasonTopicProblem
    if (value as SeasonTopicProblemUser) return SeasonTopicProblemUser
  }
})












