import { Action } from '../../auth/action.enum'
import { UserSeasonTopic } from '../../user-relations/user-season-topic/entities/user-season-topic.entity'
import { AppAbility } from '../casl-ability.factory'

export class UserTopicAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, UserSeasonTopic)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, UserSeasonTopic)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, UserSeasonTopic)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, UserSeasonTopic)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, UserSeasonTopic)
  }
}
