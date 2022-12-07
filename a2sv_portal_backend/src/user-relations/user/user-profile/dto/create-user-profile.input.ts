import { Field, InputType, Int } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { UserProfile } from '../entities/user-profile.entity'

@InputType()
export class CreateUserProfileInput extends PartialType(UserProfile) {
  @Field(() => String)
  userId: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  birthDate?: Date

  @Field({ nullable: true })
  resumeLink?: string

  @Field({ nullable: true })
  photoUrl?: string

  @Field({ nullable: true })
  bio?: string

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

  @Field({ nullable: true })
  facebook?: string
}
