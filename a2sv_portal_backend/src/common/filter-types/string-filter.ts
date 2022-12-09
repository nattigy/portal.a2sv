import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class StringFilter {
  @Field({ nullable: true })
  equals?: string

  @Field({ nullable: true })
  contains?: string

  @Field({ nullable: true })
  startsWith?: string

  @Field({ nullable: true })
  endsWith?: string

  mode: Prisma.QueryMode = Prisma.QueryMode.insensitive
}
