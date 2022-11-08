import { Action } from '../../auth/action.enum'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'
import { AppAbility } from '../casl-ability.factory'

export class UserTopicAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, UserTopic)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, UserTopic)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, UserTopic)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, UserTopic)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, UserTopic)
  }
}
