import { Ability, AbilityBuilder, createMongoAbility, InferSubjects } from '@casl/ability'
import { Action } from '../app/auth/action.enum'
import { Contest } from '../app/contest/entities/contest.entity'
import { Group } from '../app/group/entities/group.entity'
import { Problem } from '../app/problem/entities/problem.entity'
import { RoleEnum } from '../roles/interfaces/role.enum'
import { UserGroupSeasonTopicProblem } from '../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import { SeasonTopicProblem } from '../app/season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopic } from '../app/season-topic/entities/season-topic.entity'
import { Season } from '../app/season/entities/season.entity'
import { Tag } from '../app/tag/entities/tag.entity'
import { Topic } from '../app/topic/entities/topic.entity'
import { UserGroupSeasonContestProblem } from '../app/user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'
import { UserGroupSeasonContest } from '../app/user-group-season-contest/entities/user-group-season-contest.entity'
import { UserProfile } from '../app/user-profile/entities/user-profile.entity'
import { UserGroupSeasonTopic } from '../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { User } from '../app/user/entities/user.entity'

export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Group
      | typeof Tag
      | typeof Contest
      | typeof Problem
      | typeof Season
      | typeof Topic
      | typeof UserProfile
      | typeof UserGroupSeasonContest
      | typeof UserGroupSeasonContestProblem
      | typeof UserGroupSeasonTopic
      | typeof SeasonTopic
      | typeof SeasonTopicProblem
      | typeof UserGroupSeasonTopicProblem
    >
  | 'all'

export type AppAbility = Ability<[Action, Subjects]>

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(createMongoAbility)
    switch (user.role) {
      case RoleEnum.STUDENT:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        break
      case RoleEnum.HEAD_OF_ACADEMY:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        break
      case RoleEnum.ADMIN:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        break
      case RoleEnum.HEAD_OF_EDUCATION:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        break
      case RoleEnum.ASSISTANT:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        break
    }
    return build()
  }
}
