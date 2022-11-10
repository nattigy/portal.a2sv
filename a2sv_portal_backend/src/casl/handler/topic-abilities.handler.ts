import { Action } from '../../auth/action.enum'
import { Topic } from '../../topic/entities/topic.entity'
import { AppAbility } from '../casl-ability.factory'

export class TopicAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, Topic) || ability.can(Action.Manage, Topic)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, Topic) || ability.can(Action.Manage, Topic) || ability.can(Action.Manage, 'all')
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, Topic) || ability.can(Action.Manage, Topic) || ability.can(Action.Manage, 'all')
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, Topic) || ability.can(Action.Manage, Topic) || ability.can(Action.Manage, 'all')
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, Topic) || ability.can(Action.Manage, 'all')
  }
}
