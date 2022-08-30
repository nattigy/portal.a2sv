import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Season {
    @Field(() => ID)
    id: number
    @Field()
    name: string
   
    constructor(
        id: number,
        name: string,
   
      
    ) {
        this.id = id
        this.name = name
       
       
    }
}
