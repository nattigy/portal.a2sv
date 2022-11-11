import { createUnionType } from '@nestjs/graphql'
import { Contest } from '../../contest/entities/contest.entity'
import { GroupContest } from '../../group-contest/entities/group-contest.entity'
import { Group } from '../../group/entities/group.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { SeasonTopicProblemUser } from '../../season-topic-problem-user/entities/season-topic-problem-user.entity'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'
import { Season } from '../../season/entities/season.entity'
import { Topic } from '../../topic/entities/topic.entity'
import { UserContestProblem } from '../../user-contest-problem/entities/user-contest-problem.entity'
import { UserContest } from '../../user-contest/entities/user-contest.entity'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'
import { User } from '../../user/entities/user.entity'

export const Entity = createUnionType({
  name: 'Entity',
  types: () => [
    Contest,
    UserContest,
    UserContestProblem,
    GroupContest,
    User,
    Group,
    Topic,
    Season,
    Problem,
    UserTopic,
    SeasonTopic,
    SeasonTopicProblem,
    SeasonTopicProblemUser,
  ],
  resolveType(value) {
    if (value.email != undefined) {
      return User
    } else if (value.attempts != undefined && value.contestId == undefined) {
      return SeasonTopicProblemUser
    } else if (
      value.seasonId != undefined &&
      value.topicId != undefined &&
      value.problemId != undefined &&
      value.userId == undefined
    ) {
      return SeasonTopicProblem
    } else if (
      value.seasonId != undefined &&
      value.topicId != undefined &&
      value.userId == undefined &&
      value.problemId == undefined
    ) {
      return SeasonTopic
    } else if (
      value.userId != undefined &&
      value.topicId != undefined &&
      value.comfortLevel != undefined
    ) {
      return UserTopic
    } else if (value.title != undefined && value.difficulty != undefined) {
      return Problem
    } else if (value.seasonType != undefined) {
      return Season
    } else if (value.description != undefined && value.name != undefined) {
      return Topic
    } else if (
      value.startTime &&
      value.endTime &&
      value.groupContests &&
      value.problems &&
      value.name &&
      value.link
    ) {
      return Contest
    } else if (value.country != undefined && value.name != undefined) {
      return Group
    } else if (value.contestAttended != undefined) {
      return UserContest
    } else {
      return null
    }
  },
})
