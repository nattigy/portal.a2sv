import { Action } from '../../app/auth/action.enum'
import { User } from '../../app/user/entities/user.entity'
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
