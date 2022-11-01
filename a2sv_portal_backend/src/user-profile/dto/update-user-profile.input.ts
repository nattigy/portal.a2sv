import {InputType, Field, Int} from '@nestjs/graphql'

@InputType()
export class UpdateUserProfileInput {
    @Field({nullable: true})
    id?: string
    @Field(() => String, {nullable: true})
    firstName?: string = 'John' // Courtesy of dany the sun!
    @Field(() => String, {nullable: true})
    lastName?: string = 'Doe'
    @Field({nullable: true})
    phone?: string
    @Field({nullable: true})
    birthDate?: Date
    @Field(() => String, {nullable: true})
    resumeLink?: string
    @Field(() => String, {nullable: true})
    photoUrl?: string
    @Field(() => String, {nullable: true})
    bio?: string
    @Field(() => String, {nullable: true})
    educationPlace?: string
    @Field(() => Int, {nullable: true})
    educationYear?: number
    @Field(() => String, {nullable: true})
    educationDegree?: string
    @Field(() => String, {nullable: true})
    educationField?: string
    @Field(() => Int, {nullable: true})
    graduationYear?: number
    @Field(() => String, {nullable: true})
    tshirtSize?: string
    @Field(() => String, {nullable: true})
    leetcode?: string
    @Field(() => String, {nullable: true})
    github?: string
    @Field(() => String, {nullable: true})
    linkedin?: string
    @Field(() => String, {nullable: true})
    website?: string
    @Field(() => String, {nullable: true})
    hackerrank?: string
    @Field(() => String, {nullable: true})
    codeforces?: string
    @Field(() => String, {nullable: true})
    geekforgeeks?: string
    @Field(() => String, {nullable: true})
    instagram?: string
    @Field(() => String, {nullable: true})
    twitter?: string
    @Field(() => String, {nullable: true})
    facebook?: string
    @Field({nullable: true})
    createdAt?: Date
    @Field({nullable: true})
    updatedAt?: Date
}
