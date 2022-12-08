import { Field, InputType } from "@nestjs/graphql";
import { UniqueUserInput } from "./filter-user-input";

@InputType()
export class ResetPasswordInput {

    @Field()
    email: string
    
    @Field()
    password: string
}