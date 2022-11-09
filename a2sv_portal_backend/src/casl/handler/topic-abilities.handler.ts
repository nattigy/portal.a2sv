import { Action } from '../../auth/action.enum'
import { Topic } from '../../topic/entities/topic.entity'
import { AppAbility } from '../casl-ability.factory'

export class TopicAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, Topic)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, Topic)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, Topic)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, Topic)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, Topic)
  }
}
