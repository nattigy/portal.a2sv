import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Group } from '../../group/entities/group.entity'
import { Season } from '../../../season-relations/season/entities/season.entity'
import { JoinRequestEnum } from '@prisma/client'
import { User } from '../../../user-relations/user/entities/user.entity'

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

  @Field(() => JoinRequestEnum)
  joinRequest: JoinRequestEnum

  @Field(() => Date)
  startDate: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date

  @Field(() => Group)
  group: Group

  @Field(() => Season)
  season: Season

  @Field(() => User)
  head: User

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(JoinRequestEnum, {
  name: 'JoinRequestEnum',
})
