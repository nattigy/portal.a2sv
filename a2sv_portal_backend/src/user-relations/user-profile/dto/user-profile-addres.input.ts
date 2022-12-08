import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserProfileAddressInput {
  @Field()
  country: string

  @Field()
  city: string
}

@InputType()
export class UpdateUserProfileAddressInput {
  @Field()
  country?: string

  @Field()
  city?: string
}

@InputType()
export class FilterUserProfileAddressInput {
  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  city?: string
}