import { Action } from '../../auth/action.enum'
import { SeasonTopicProblem } from '../../app/season-topic-problem/entities/season-topic-problem.entity'
import { AppAbility } from '../casl-ability.factory'

export class SeasonTopicProblemAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, SeasonTopicProblem)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, SeasonTopicProblem)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, SeasonTopicProblem)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, SeasonTopicProblem)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, SeasonTopicProblem)
  }
}
