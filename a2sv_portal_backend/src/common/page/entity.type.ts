import { createUnionType } from '@nestjs/graphql'
import { Contest } from '../../contest/entities/contest.entity'
import { Group } from '../../group-relations/group/entities/group.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { UserSeasonTopicProblem } from '../../user-relations/user-season-topic-problem/entities/user-season-topic-problem.entity'
import { SeasonTopicProblem } from '../../season-relations/season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopic } from '../../season-relations/season-topic/entities/season-topic.entity'
import { Season } from '../../season-relations/season/entities/season.entity'
import { Topic } from '../../topic/entities/topic.entity'
import { UserSeasonContestProblem } from '../../user-relations/user-season-contest-problem/entities/user-season-contest-problem.entity'
import { UserSeasonContest } from '../../user-relations/user-season-contest/entities/user-season-contest.entity'
import { UserSeasonTopic } from '../../user-relations/user-season-topic/entities/user-season-topic.entity'
import { User } from '../../user-relations/user/entities/user.entity'

export const Entity = createUnionType({
  name: 'Entity',
  types: () => [
    Contest,
    UserSeasonContest,
    UserSeasonContestProblem,
    User,
    Group,
    Topic,
    Season,
    Problem,
    UserSeasonTopic,
    SeasonTopic,
    SeasonTopicProblem,
    UserSeasonTopicProblem,
  ],
  resolveType(value) {
    if (value.email != undefined) {
      return User
    } else if (value.attempts != undefined && value.contestId == undefined) {
      return UserSeasonTopicProblem
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
      return UserSeasonTopic
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
      return UserSeasonContest
    } else {
      return null
    }
  },
})
