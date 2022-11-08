import { Action } from '../../auth/action.enum'
import { Problem } from '../../problem/entities/problem.entity'
import { AppAbility } from '../casl-ability.factory'

export class ProblemAbilities {
  read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, Problem)
  }

  create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, Problem)
  }

  delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, Problem)
  }

  update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, Problem)
  }

  manage(ability: AppAbility) {
    return ability.can(Action.Manage, Problem)
  }
}