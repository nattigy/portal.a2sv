import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class UserProfile {
  @Field(() => Int)
  id: number
  @Field(() => Int)
  userId: number
  @Field(() => String)
  firstName?: string = 'John' // Courtesy of dany the sun!
  @Field(() => String)
  lastName?: string = 'Doe'
  @Field()
  phone?: string
  @Field()
  birthDate?: Date
  @Field(() => String)
  resumeLink?: string
  @Field(() => String)
  photoURL?: string
  @Field(() => String)
  bio?: string
  @Field(() => String)
  educationPlace?: string
  @Field(() => Int)
  educationYear?: number
  @Field(() => String)
  educationDegree?: string
  @Field(() => String)
  educationField?: string
  @Field(() => Int)
  graduationYear?: number
  @Field(() => String)
  tshirtSize?: string
  @Field(() => String)
  leetcode?: string
  @Field(() => String)
  github?: string
  @Field(() => String)
  linkedin?: string
  @Field(() => String)
  website?: string
  @Field(() => String)
  hackerrank?: string
  @Field(() => String)
  codeforces?: string
  @Field(() => String)
  geekforgeeks?: string
  @Field(() => String)
  instagram?: string
  @Field(() => String)
  twitter?: string
  @Field(() => String)
  facebook?: string
}
