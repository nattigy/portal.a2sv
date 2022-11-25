import { registerEnumType } from '@nestjs/graphql'

export enum SeasonType {
  CAMP = 'CAMP',
  EDUCATION = 'EDUCATION',
  PROJECT = 'PROJECT',
}

registerEnumType(SeasonType, { name: 'SeasonType' })
