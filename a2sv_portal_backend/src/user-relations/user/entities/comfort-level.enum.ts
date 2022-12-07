import { registerEnumType } from '@nestjs/graphql'

export enum ComfortLevelEnum {
  COMFORTABLE = 'COMFORTABLE',
  UNCOMFORTABLE = 'UNCOMFORTABLE',
  MEDIOCRE = 'MEDIOCRE',
}

registerEnumType(ComfortLevelEnum, { name: 'ComfortLevel' })
