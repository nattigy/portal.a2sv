import { Action } from '../../auth/action.enum'
import {
  SeasonTopicProblemUser
} from '../../season-topic-problem-user/entities/season-topic-problem-user.entity'
import {
  UserContestProblem
} from '../../user-contest-problem/entities/user-contest-problem.entity'
import { UserContest } from '../../user-contest/entities/user-contest.entity'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'
import { User } from '../../user/entities/user.entity'
import { AppAbility } from '../casl-ability.factory'

export class UserAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, User)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, User)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, User)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, User)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, User)
  }
}