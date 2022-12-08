import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserProfileAddressInput {
    @Field()
    country: string
  
    @Field()
    city: string
}


@InputType()
export class FilterUserProfileAddressInput {
    @Field()
    country: string
  
    @Field()
    city: string
}