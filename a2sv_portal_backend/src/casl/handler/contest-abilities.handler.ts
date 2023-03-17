import { Action } from '../../app/auth/action.enum'
import { Contest } from '../../app/contest/entities/contest.entity'
import { AppAbility } from '../casl-ability.factory'

export class ContestAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, Contest)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, Contest)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, Contest)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, Contest)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, Contest)
  }
}
