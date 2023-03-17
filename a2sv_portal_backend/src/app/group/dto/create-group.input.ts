import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupInput {
  @Field()
  name: string

  @Field({ nullable: true })
<<<<<<<< HEAD:a2sv_portal_backend/src/group/dto/create-group.input.ts
  country: string
  @Field({ nullable: true })
  school?: string
========
  country?: string

  @Field({ nullable: true })
  school?: string

>>>>>>>> backend:a2sv_portal_backend/src/app/group/dto/create-group.input.ts
  @Field({ nullable: true })
  headId?: string
}
