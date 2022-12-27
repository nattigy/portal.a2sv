import { Field, InputType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'
import { StringFilter } from '../../../common/filter-types/string-filter'
import { DateTimeFilter } from '../../../common/filter-types/date-filter'

@InputType()
export class FilterUserInput {
  @Field({ nullable: true })
  id?: string

  // @Field(() => StringFilter, { nullable: true })
  // name?: StringFilter

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum

  @Field({ nullable: true })
  email?: string

  @Field(() => StatusEnum, { nullable: true })
  status?: StatusEnum

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  userProfilesId?: string

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: Date
}

@InputType()
export class UniqueUserInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  email?: string
}
