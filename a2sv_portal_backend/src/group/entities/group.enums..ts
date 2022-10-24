import {registerEnumType} from "@nestjs/graphql";

export enum TopicStatusEnum {
  COVERED = 'COVERED',
  NOT_COVERED = 'NOT_COVERED',
}

registerEnumType(TopicStatusEnum, {
  name: 'TOPIC_STATUS_ENUM',
})