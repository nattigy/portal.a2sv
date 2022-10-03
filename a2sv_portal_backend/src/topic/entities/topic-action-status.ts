import { registerEnumType } from '@nestjs/graphql'

export enum TopicActionStatus {
  FAILED,
  SUCCESS,
}

registerEnumType(TopicActionStatus, { name: 'TopicActionStatus' })
