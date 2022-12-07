import { Ability, AbilityBuilder, createMongoAbility, InferSubjects } from '@casl/ability'
import { Action } from '../auth/action.enum'
import { Contest } from '../contest/entities/contest.entity'
import { Group } from '../group-relations/group/entities/group.entity'
import { Problem } from '../problem/entities/problem.entity'
import { RoleEnum } from '../roles/interfaces/role.enum'
import { UserSeasonTopicProblem } from '../user-relations/user-season-topic-problem/entities/user-season-topic-problem.entity'
import { SeasonTopicProblem } from '../season-relations/season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopic } from '../season-relations/season-topic/entities/season-topic.entity'
import { Season } from '../season-relations/season/entities/season.entity'
import { Tag } from '../tag/entities/tag.entity'
import { Topic } from '../topic/entities/topic.entity'
import { UserContestProblem } from '../user-relations/user-season-contest-problem/entities/user-season-contest-problem.entity'
import { UserSeasonContest } from '../user-relations/user-season-contest/entities/user-season-contest.entity'
import { UserProfile } from '../user-relations/user/user-profile/entities/user-profile.entity'
import { UserSeasonTopic } from '../user-relations/user-season-topic/entities/user-season-topic.entity'
import { User } from '../user-relations/user/entities/user.entity'

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
      | typeof UserSeasonContest
      | typeof UserContestProblem
      | typeof UserSeasonTopic
      | typeof SeasonTopic
      | typeof SeasonTopicProblem
      | typeof UserSeasonTopicProblem
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
        can(Action.Manage, UserSeasonContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserSeasonTopicProblem)
        break
      case RoleEnum.HEAD_OF_ACADEMY:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserSeasonContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserSeasonTopicProblem)
        break
      case RoleEnum.ADMIN:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserSeasonContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserSeasonTopicProblem)
        break
      case RoleEnum.HEAD_OF_EDUCATION:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserSeasonContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserSeasonTopicProblem)
        break
      case RoleEnum.ASSISTANT:
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, Group)
        can(Action.Manage, Season)
        can(Action.Manage, Problem)
        can(Action.Manage, Contest)
        can(Action.Manage, UserSeasonContest)
        can(Action.Manage, UserContestProblem)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, UserSeasonTopicProblem)
        break
    }
    return build()
  }
}
