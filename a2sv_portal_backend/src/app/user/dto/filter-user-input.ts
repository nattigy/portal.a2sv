import { Field, InputType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'
import { DateTimeFilter } from '../../../common/filter-types/date-filter'

@InputType()
export class FilterUserInput {
  @Field({ nullable: true })
  id?: string

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum

  @Field({ nullable: true })
  email?: string

  @Field(() => StatusEnum, { nullable: true, defaultValue: StatusEnum.ACTIVE })
  status?: StatusEnum

  @Field({ nullable: true })
  groupId?: string

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter
}

@InputType()
export class UniqueUserInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  email?: string
}
