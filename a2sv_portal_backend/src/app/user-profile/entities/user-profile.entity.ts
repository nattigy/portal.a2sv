import { Field, GraphQLISODateTime, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { CurrentEducationStatusEnum, CurrentWorkStatusEnum } from '@prisma/client'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class UserProfile {
  @Field()
  id: string

  @Field()
  userId: string

  @Field()
  firstName: string

  @Field()
  middleName: string

  @Field()
  lastName: string

  @Field({ description: 'Email of the user' })
  email: string

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
  github: string

  @Field()
  telegram: string

  @Field()
  linkedin: string

  @Field({ nullable: true })
  twitter?: string

  @Field({ nullable: true })
  instagram?: string

  @Field()
  leetcode: string

  @Field()
  codeforces: string

  @Field()
  hackerrank: string

  @Field({ nullable: true })
  geekforgeeks?: string

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

  @Field({ nullable: true })
  website?: string

  @Field()
  bio: string

  @Field(() => User)
  user: User

  @Field()
  country: string

  @Field()
  city: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}

registerEnumType(CurrentWorkStatusEnum, {
  name: 'CurrentWorkStatusEnum',
})

registerEnumType(CurrentEducationStatusEnum, {
  name: 'CurrentEducationStatusEnum',
})
