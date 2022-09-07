import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetTopicArgs{
    @Field(() => Int, { nullable: true })
    skip: number
  
    @Field(() => Int, { nullable: true })
    take: number

    
    @Field(()=>Int,{nullable:true})
    seasonId?: number


    @Field(()=>Int, {nullable:true})
    groupId?: number
}