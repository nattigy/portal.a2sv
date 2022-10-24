import {InputType, Field, Int} from '@nestjs/graphql'
import {PartialType} from '@nestjs/mapped-types'
import {UserProfile} from '../entities/user-profile.entity'

@InputType()
export class UpdateUserProfileInput extends PartialType(UserProfile) {
    @Field(() => Int, {nullable: true})
    id?: string
}
