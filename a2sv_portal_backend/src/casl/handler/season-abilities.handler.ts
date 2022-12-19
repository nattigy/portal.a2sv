import { Action } from '../../auth/action.enum'
import { Season } from '../../app/season/entities/season.entity'
import { AppAbility } from '../casl-ability.factory'

export class SeasonAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, Season)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, Season)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, Season)
  }

  static manange(ability: AppAbility) {
    return ability.can(Action.Manage, Season)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, Season)
  }
}
