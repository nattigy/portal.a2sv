import { Action } from '../../app/auth/action.enum'
import { AppAbility } from '../casl-ability.factory'
import { GroupSeason } from '../../app/group-season/entities/group-season.entity'

export class GroupSeasonAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, GroupSeason)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, GroupSeason)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, GroupSeason)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, GroupSeason)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, GroupSeason)
  }
}
