import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user-relations/user/entities/user.entity'

@ObjectType()
export class DataAnalytic {
  @Field(() => Int, { description: 'number of solved problems per day' })
  solvedCount: number

  @Field(() => Int, { description: 'number of solved problems per day' })
  wrongCount: number

  @Field(() => Date, { description: 'date of problem solved' })
  createdAt: Date

  @Field(() => Date, { description: 'date of problem solved' })
  updatedAt: Date

  @Field(() => User, { description: 'date of problem solved' })
  user: User
}
