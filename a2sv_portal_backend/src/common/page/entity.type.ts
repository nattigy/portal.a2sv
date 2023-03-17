import { createUnionType } from '@nestjs/graphql'
import { Contest } from '../../app/contest/entities/contest.entity'
import { Group } from '../../app/group/entities/group.entity'
import { Problem } from '../../app/problem/entities/problem.entity'
import { UserGroupSeasonTopicProblem } from '../../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import { SeasonTopicProblem } from '../../app/season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopic } from '../../app/season-topic/entities/season-topic.entity'
import { Season } from '../../app/season/entities/season.entity'
import { Topic } from '../../app/topic/entities/topic.entity'
import { UserGroupSeasonContestProblem } from '../../app/user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'
import { UserGroupSeasonContest } from '../../app/user-group-season-contest/entities/user-group-season-contest.entity'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { User } from '../../app/user/entities/user.entity'

export const Entity = createUnionType({
  name: 'Entity',
  types: () => [
    Contest,
    UserGroupSeasonContest,
    UserGroupSeasonContestProblem,
    User,
    Group,
    Topic,
    Season,
    Problem,
    UserGroupSeasonTopic,
    SeasonTopic,
    SeasonTopicProblem,
    UserGroupSeasonTopicProblem,
  ],
  resolveType(value) {
    if (value.email != undefined) {
      return User
    } else if (value.attempts != undefined && value.contestId == undefined) {
      return UserGroupSeasonTopicProblem
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
      return UserGroupSeasonTopic
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
      return UserGroupSeasonContest
    } else {
      return null
    }
  },
})
