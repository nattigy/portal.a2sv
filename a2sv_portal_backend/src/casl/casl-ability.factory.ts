import {
  Ability,
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
} from '@casl/ability'
import { Action } from '../auth/action.enum'
import { Contest } from '../contest/entities/contest.entity'
import { GroupContest } from '../group-contest/entities/group-contest.entity'
import { Group } from '../group/entities/group.entity'
import { Problem } from '../problem/entities/problem.entity'
import { RoleEnum } from '../roles/interfaces/role.enum'
import {
  SeasonTopicProblemUser,
} from '../season-topic-problem-user/entities/season-topic-problem-user.entity'
import {
  SeasonTopicProblem,
} from '../season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopic } from '../season-topic/entities/season-topic.entity'
import { Season } from '../season/entities/season.entity'
import { Tag } from '../tag/entities/tag.entity'
import { Topic } from '../topic/entities/topic.entity'
import {
  UserContestProblem,
} from '../user-contest-problem/entities/user-contest-problem.entity'
import { UserContest } from '../user-contest/entities/user-contest.entity'
import { UserProfile } from '../user-profile/entities/user-profile.entity'
import { UserTopic } from '../user-topic/entities/user-topic.entity'
import { User } from '../user/entities/user.entity'

export type Subjects =
  | InferSubjects<| typeof User
  | typeof Group
  | typeof Tag
  | typeof Contest
  | typeof Problem
  | typeof Season
  | typeof Topic
  | typeof UserProfile
  | typeof UserContest
  | typeof UserContestProblem
  | typeof UserTopic
  | typeof SeasonTopic
  | typeof SeasonTopicProblem
  | typeof SeasonTopicProblemUser
  | typeof GroupContest>
  | 'all'

export type AppAbility = Ability<[Action, Subjects]>

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      createMongoAbility,
    )
    switch (user.role) {
      case RoleEnum.STUDENT:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, GroupContest)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, SeasonTopicProblemUser)
        break
      case RoleEnum.HEAD_OF_ACADEMY:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, GroupContest)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, SeasonTopicProblemUser)
        break
      case RoleEnum.ADMIN:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, GroupContest)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, SeasonTopicProblemUser)
        break
      case RoleEnum.HEAD_OF_EDUCATION:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, GroupContest)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, SeasonTopicProblemUser)
        break
      case RoleEnum.ASSISTANT:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, GroupContest)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, SeasonTopicProblemUser)
        break
    }
    return build()
  }
}
