import {
  Ability,
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
} from '@casl/ability'
import { Contest } from '../contest/entities/contest.entity'
import { User } from '../user/entities/user.entity'
import { Season } from '../season/entities/season.entity'
import { Problem } from '../problem/entities/problem.entity'
import { Topic } from '../topic/entities/topic.entity'
import { UserProfile } from '../user-profile/entities/user-profile.entity'
import { UserContest } from '../user-contest/entities/user-contest.entity'
import { UserContestProblem } from '../user-contest-problem/entities/user-contest-problem.entity'
import { UserTopic } from '../user-topic/entities/user-topic.entity'
import { SeasonTopic } from '../season-topic/entities/season-topic.entity'
import { SeasonTopicProblem } from '../season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopicProblemUser } from '../season-topic-problem-user/entities/season-topic-problem-user.entity'
import { Group } from '../group/entities/group.entity'
import { Tag } from '../tag/entities/tag.entity'
import { Action } from '../auth/action.enum'
import { RoleEnum } from '../roles/interfaces/role.enum'

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
      | typeof UserContest
      | typeof UserContestProblem
      | typeof UserTopic
      | typeof SeasonTopic
      | typeof SeasonTopicProblem
      | typeof SeasonTopicProblemUser
    >
  | 'all'

export type AppAbility = Ability<[Action, Subjects]>

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(createMongoAbility)
    switch (user.role) {
      case RoleEnum.STUDENT:
        can(
          Action.Update || Action.Read || Action.Create,
          UserContest ||
            UserTopic ||
            UserContestProblem ||
            UserProfile ||
            SeasonTopicProblemUser,
        )
        break
      case RoleEnum.HEAD_OF_ACADEMY || RoleEnum.ADMIN:
        can(Action.Manage, 'all')
        break
      case RoleEnum.HEAD_OF_EDUCATION:
        can(Action.Manage, User || Season, { groupId: user.headToGroup.id })
        can(Action.Manage, Contest)
        break
      case RoleEnum.ASSISTANT:
        can(
          Action.Update || Action.Read || Action.Create || Action.Delete,
          UserContest ||
            UserTopic ||
            UserContestProblem ||
            UserProfile ||
            SeasonTopicProblemUser,
        )
        break
    }
    return build()
  }
}
