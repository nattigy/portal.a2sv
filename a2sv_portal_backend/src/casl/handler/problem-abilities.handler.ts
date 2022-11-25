import { Action } from '../../auth/action.enum'
import { Problem } from '../../problem/entities/problem.entity'
import { AppAbility } from '../casl-ability.factory'

export class ProblemAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, Problem)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, Problem)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, Problem)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, Problem)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, Problem)
  }
}
