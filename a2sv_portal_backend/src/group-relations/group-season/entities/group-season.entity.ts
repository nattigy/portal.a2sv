import { Field, ObjectType } from '@nestjs/graphql'
import { Group } from '../../group/entities/group.entity'
import { Season } from '../../../season-relations/season/entities/season.entity'

@ObjectType()
export class GroupSeason {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  isActive: boolean

  @Field()
  headId: string

  @Field(() => Group)
  group: Group

  @Field(() => Season)
  season: Season

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
