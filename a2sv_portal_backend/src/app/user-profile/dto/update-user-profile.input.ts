import { Field, InputType, Int } from '@nestjs/graphql'
import { CurrentEducationStatusEnum, CurrentWorkStatusEnum } from '@prisma/client'
import { UpdateUserProfileAddressInput } from './user-profile-addres.input'

@InputType()
export class UpdateUserProfileInput {
  @Field()
  userId: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  middleName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  countryCode?: string

  @Field({ nullable: true })
  birthDate?: Date

  @Field({ nullable: true })
  resumeLink?: string

  @Field({ nullable: true })
  photoUrl?: string

  @Field({ nullable: true })
  bio?: string

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

  @Field({ nullable: true })
  telegram?: string

  @Field({ nullable: true })
  leetcode?: string

  @Field({ nullable: true })
  github?: string

  @Field({ nullable: true })
  linkedin?: string

  @Field({ nullable: true })
  website?: string

  @Field({ nullable: true })
  hackerrank?: string

  @Field({ nullable: true })
  codeforces?: string

  @Field({ nullable: true })
  geekforgeeks?: string

  @Field({ nullable: true })
  instagram?: string

  @Field({ nullable: true })
  twitter?: string

  @Field(() => UpdateUserProfileAddressInput, { nullable: true })
  userProfileAddress?: UpdateUserProfileAddressInput
}
