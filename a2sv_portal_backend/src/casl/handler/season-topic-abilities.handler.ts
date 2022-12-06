import { Action } from '../../auth/action.enum'
import { SeasonTopic } from '../../season-relations/season-topic/entities/season-topic.entity'
import { AppAbility } from '../casl-ability.factory'

export class SeasonTopicAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, SeasonTopic)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, SeasonTopic)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, SeasonTopic)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, SeasonTopic)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, SeasonTopic)
  }
}
