import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { CurrentEducationStatusEnum, CurrentWorkStatusEnum } from '@prisma/client'
import { User } from '../../user/entities/user.entity'
import { UserProfileAddress } from './user-profile-address.entity'

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

  @Field({ nullable: true })
  photoUrl?: string

  @Field()
  phone: string

  @Field()
  countryCode: string

  @Field({ nullable: true })
  birthDate?: Date

  @Field()
  resumeLink: string

  @Field({ nullable: true })
  github?: string

  @Field({ nullable: true })
  telegram?: string

  @Field({ nullable: true })
  linkedin?: string

  @Field({ nullable: true })
  twitter?: string

  @Field({ nullable: true })
  facebook?: string

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

  @Field(() => UserProfileAddress, { nullable: true })
  userProfileAddress?: UserProfileAddress

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(CurrentWorkStatusEnum, {
  name: 'CurrentWorkStatusEnum',
})

registerEnumType(CurrentEducationStatusEnum, {
  name: 'CurrentEducationStatusEnum',
})
