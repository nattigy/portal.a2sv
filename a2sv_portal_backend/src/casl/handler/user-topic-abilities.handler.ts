import { Action } from '../../app/auth/action.enum'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { AppAbility } from '../casl-ability.factory'

export class UserTopicAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, UserGroupSeasonTopic)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, UserGroupSeasonTopic)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, UserGroupSeasonTopic)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, UserGroupSeasonTopic)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, UserGroupSeasonTopic)
  }
}
