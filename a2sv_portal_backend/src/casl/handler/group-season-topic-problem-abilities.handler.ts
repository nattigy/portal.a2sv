import { Action } from '../../app/auth/action.enum'
import { AppAbility } from '../casl-ability.factory'
import {
  GroupSeasonTopicProblem
} from '../../app/group-season-topic-problem/entities/group-season-topic-problem.entity'

export class GroupSeasonTopicProblemAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, GroupSeasonTopicProblem)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, GroupSeasonTopicProblem)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, GroupSeasonTopicProblem)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, GroupSeasonTopicProblem)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, GroupSeasonTopicProblem)
  }
}
