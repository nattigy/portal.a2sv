import { Action } from '../../app/auth/action.enum'
import { AppAbility } from '../casl-ability.factory'
import { GroupSeasonTopic } from '../../app/group-season-topic/entities/group-season-topic.entity'

export class GroupSeasonTopicAbilities {
  static read(ability: AppAbility) {
    return ability.can(Action.Read || Action.Manage, GroupSeasonTopic)
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update || Action.Manage, GroupSeasonTopic)
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create || Action.Manage, GroupSeasonTopic)
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete || Action.Manage, GroupSeasonTopic)
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, GroupSeasonTopic)
  }
}
