import { Field, InputType, Int } from '@nestjs/graphql'
import { CurrentEducationStatusEnum, CurrentWorkStatusEnum } from '@prisma/client'
import { FilterUserProfileAddressInput} from './user-profile-addres.input'

@InputType()
export class FilterUserProfileInput {
  @Field({ nullable: true })
  id?: string

  @Field(() => String)
  userId?: string

  @Field()
  phone?: string

  @Field()
  countryCode?: string

  @Field({ nullable: true })
  birthDate?: Date

  @Field()
  resumeLink?: string

  @Field({ nullable: true })
  photoUrl?: string

  @Field()
  bio?: string

  @Field(() => CurrentWorkStatusEnum)
  currentWorkStatus?: CurrentWorkStatusEnum

  @Field(() => CurrentEducationStatusEnum)
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

  @Field()
  leetcode?: string

  @Field({ nullable: true })
  github?: string

  @Field({ nullable: true })
  linkedin?: string

  @Field({ nullable: true })
  website?: string

  @Field()
  hackerrank?: string

  @Field()
  codeforces?: string

  @Field({ nullable: true })
  geekforgeeks?: string

  @Field({ nullable: true })
  instagram?: string

  @Field({ nullable: true })
  twitter?: string

  @Field({ nullable: true })
  facebook?: string

  @Field(()=> FilterUserProfileAddressInput, { nullable: true })
  userProfileAddress?: FilterUserProfileAddressInput
}
