import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql'
import { CurrentEducationStatusEnum, CurrentWorkStatusEnum } from '@prisma/client'

@InputType()
export class CreateUserProfileInput {
  @Field()
  firstName: string

  @Field()
  middleName: string = ''

  @Field()
  lastName: string

  @Field()
  photoUrl: string

  @Field()
  phone: string

  @Field()
  countryCode: string

  @Field(() => GraphQLISODateTime)
  birthDate: Date

  @Field()
  resumeLink: string

  @Field()
  telegram: string

  @Field()
  github: string

  @Field()
  email: string

  @Field()
  linkedin: string

  @Field({ nullable: true })
  instagram?: string

  @Field({ nullable: true })
  twitter?: string

  @Field({ nullable: true })
  website?: string

  @Field()
  bio: string

  @Field(() => CurrentWorkStatusEnum)
  currentWorkStatus: CurrentWorkStatusEnum

  @Field(() => CurrentEducationStatusEnum)
  currentEducationStatus: CurrentEducationStatusEnum

  @Field()
  educationPlace: string

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
  leetcode: string

  @Field()
  hackerrank: string

  @Field()
  codeforces: string

  @Field({ nullable: true })
  geekforgeeks?: string

  @Field()
  country: string

  @Field()
  city: string
}
