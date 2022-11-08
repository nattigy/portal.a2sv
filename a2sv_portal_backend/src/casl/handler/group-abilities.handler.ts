import { Action } from '../../auth/action.enum'
import { Group } from '../../group/entities/group.entity'
import { AppAbility } from '../casl-ability.factory'

export class GroupAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, Group)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, Group)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, Group)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, Group)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, Group)
  }
}
