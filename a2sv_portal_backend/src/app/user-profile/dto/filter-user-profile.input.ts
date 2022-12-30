import { Field, InputType, Int } from '@nestjs/graphql'
import { CurrentEducationStatusEnum, CurrentWorkStatusEnum } from '@prisma/client'
import { StringFilter } from 'src/common/filter-types/string-filter'
import { FilterUserProfileAddressInput } from './user-profile-addres.input'

@InputType()
export class FilterUserProfileInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  userId?: string

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  countryCode?: string

  @Field(() => Date, { nullable: true })
  birthDate?: Date

  @Field(() => CurrentWorkStatusEnum, { nullable: true })
  currentWorkStatus?: CurrentWorkStatusEnum

  @Field(() => CurrentEducationStatusEnum, { nullable: true })
  currentEducationStatus?: CurrentEducationStatusEnum

  @Field({ nullable: true })
  educationPlace?: string

  @Field(() => Int, { nullable: true })
  educationYear?: number

  @Field({ nullable: true })
  educationDegree?: string

  @Field({ nullable: true })
  educationField?: string

  @Field(() => Int, { nullable: true })
  graduationYear?: number

  @Field({ nullable: true })
  tshirtSize?: string

  @Field(() => FilterUserProfileAddressInput, { nullable: true })
  userProfileAddress?: FilterUserProfileAddressInput
}
