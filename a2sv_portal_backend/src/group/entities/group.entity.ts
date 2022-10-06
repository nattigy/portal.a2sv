import {Field, ID, Int, ObjectType} from '@nestjs/graphql'
import {User} from 'src/user/entities/user.entity'
import {GroupTopicSeason} from '../../group-topic-season/entities/group-topic-season.entity'

@ObjectType()
export class Group {
    @Field(() => ID)
    id: number
    @Field()
    name: string
    @Field()
    createdAt: Date
    @Field({nullable: true})
    country?: string
    @Field({nullable: true})
    school?: string
    @Field(() => [User], {nullable: true})
    users?: User[]
    @Field(() => [GroupTopicSeason], {nullable: true})
    seasonTopics?: GroupTopicSeason[]
    @Field(() => Int, {nullable: true})
    headId?: number
    @Field(() => User, {nullable: true})
    head?: User

    constructor(
        id: number,
        name: string,
        createdAt: Date,
        country?: string,
        school?: string,
    ) {
        this.id = id
        this.name = name
        this.createdAt = createdAt
        this.country = country
        this.school = school
    }
}
