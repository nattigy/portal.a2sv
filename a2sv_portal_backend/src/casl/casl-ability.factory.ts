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
import { GroupSeason } from '../app/group-season/entities/group-season.entity'
import { GroupSeasonContest } from '../app/group-season-contest/entities/group-season-contest.entity'
import { GroupSeasonContestProblem } from '../app/group-season-contest-problem/entities/group-season-contest-problem.entity'
import { GroupSeasonTopic } from '../app/group-season-topic/entities/group-season-topic.entity'
import { GroupSeasonTopicProblem } from '../app/group-season-topic-problem/entities/group-season-topic-problem.entity'
import { SeasonContest } from '../app/season-contest/entities/season-contest.entity'
import { UserGroupSeason } from '../app/user-group-season/entities/user-group-season.entity'

export type Subjects =
  | InferSubjects<
      | typeof Contest
      | typeof Group
      | typeof GroupSeason
      | typeof GroupSeasonContest
      | typeof GroupSeasonContestProblem
      | typeof GroupSeasonTopic
      | typeof GroupSeasonTopicProblem
      | typeof Problem
      | typeof Season
      | typeof SeasonContest
      | typeof SeasonTopic
      | typeof SeasonTopicProblem
      | typeof Tag
      | typeof Topic
      | typeof User
      | typeof UserGroupSeason
      | typeof UserGroupSeasonContest
      | typeof UserGroupSeasonContestProblem
      | typeof UserGroupSeasonTopic
      | typeof UserGroupSeasonTopicProblem
      | typeof UserProfile
    >
  | 'all'

export type AppAbility = Ability<[Action, Subjects]>

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(createMongoAbility)
    switch (user.role) {
      case RoleEnum.STUDENT:
        can(Action.Read, Contest)
        can(Action.Read, Group)
        can(Action.Read, GroupSeason)
        can(Action.Read, GroupSeasonContest)
        can(Action.Read, GroupSeasonContestProblem)
        can(Action.Read, GroupSeasonTopic)
        can(Action.Read, GroupSeasonTopicProblem)
        can(Action.Read, Problem)
        can(Action.Read, Season)
        can(Action.Read, SeasonContest)
        can(Action.Read, SeasonTopic)
        can(Action.Read, SeasonTopicProblem)
        can(Action.Read, Tag)
        can(Action.Read, Topic)
        can(Action.Manage, User)
        can(Action.Manage, UserGroupSeason)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, UserGroupSeasonTopic)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        can(Action.Manage, UserProfile)
        break
      case RoleEnum.HEAD_OF_ACADEMY:
        can(Action.Manage, Contest)
        can(Action.Manage, Group)
        can(Action.Manage, GroupSeason)
        can(Action.Manage, GroupSeasonContest)
        can(Action.Manage, GroupSeasonContestProblem)
        can(Action.Manage, GroupSeasonTopic)
        can(Action.Manage, GroupSeasonTopicProblem)
        can(Action.Manage, Problem)
        can(Action.Manage, Season)
        can(Action.Manage, SeasonContest)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, Tag)
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, UserGroupSeason)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, UserGroupSeasonTopic)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        can(Action.Manage, UserProfile)
        break
      case RoleEnum.ADMIN:
        can(Action.Manage, Contest)
        can(Action.Manage, Group)
        can(Action.Manage, GroupSeason)
        can(Action.Manage, GroupSeasonContest)
        can(Action.Manage, GroupSeasonContestProblem)
        can(Action.Manage, GroupSeasonTopic)
        can(Action.Manage, GroupSeasonTopicProblem)
        can(Action.Manage, Problem)
        can(Action.Manage, Season)
        can(Action.Manage, SeasonContest)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, Tag)
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, UserGroupSeason)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, UserGroupSeasonTopic)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        can(Action.Manage, UserProfile)
        break
      case RoleEnum.HEAD_OF_EDUCATION:
        can(Action.Manage, Contest)
        can(Action.Manage, Group)
        can(Action.Manage, GroupSeason)
        can(Action.Manage, GroupSeasonContest)
        can(Action.Manage, GroupSeasonContestProblem)
        can(Action.Manage, GroupSeasonTopic)
        can(Action.Manage, GroupSeasonTopicProblem)
        can(Action.Manage, Problem)
        can(Action.Manage, Season)
        can(Action.Manage, SeasonContest)
        can(Action.Manage, SeasonTopic)
        can(Action.Manage, SeasonTopicProblem)
        can(Action.Manage, Tag)
        can(Action.Manage, Topic)
        can(Action.Manage, User)
        can(Action.Manage, UserGroupSeason)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, UserGroupSeasonTopic)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        can(Action.Manage, UserProfile)
        break
      case RoleEnum.ASSISTANT:
        can(Action.Read, Contest)
        can(Action.Read, Group)
        can(Action.Read, GroupSeason)
        can(Action.Read, GroupSeasonContest)
        can(Action.Read, GroupSeasonContestProblem)
        can(Action.Read, GroupSeasonTopic)
        can(Action.Read, GroupSeasonTopicProblem)
        can(Action.Read, Problem)
        can(Action.Read, Season)
        can(Action.Read, SeasonContest)
        can(Action.Read, SeasonTopic)
        can(Action.Read, SeasonTopicProblem)
        can(Action.Read, Tag)
        can(Action.Read, Topic)
        can(Action.Manage, User)
        can(Action.Manage, UserGroupSeason)
        can(Action.Manage, UserGroupSeasonContest)
        can(Action.Manage, UserGroupSeasonContestProblem)
        can(Action.Manage, UserGroupSeasonTopic)
        can(Action.Manage, UserGroupSeasonTopicProblem)
        can(Action.Manage, UserProfile)
        break
    }
    return build()
  }
}
