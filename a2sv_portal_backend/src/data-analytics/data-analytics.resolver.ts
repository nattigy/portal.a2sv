import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DataAnalyticsService } from './data-analytics.service';
import { DataAnalytic } from './entities/data-analytic.entity';
import { CreateDataAnalyticInput } from './dto/create-data-analytic.input';
import { UpdateDataAnalyticInput } from './dto/update-data-analytic.input';
import { UserAnalytics } from '@prisma/client';

@Resolver(() => DataAnalytic)
export class DataAnalyticsResolver {
  constructor(private readonly dataAnalyticsService: DataAnalyticsService) {}

  @Mutation(() => DataAnalytic)
  createDataAnalytic(@Args('createDataAnalyticInput') createDataAnalyticInput: CreateDataAnalyticInput) {
    return this.dataAnalyticsService.create(createDataAnalyticInput);
  }

  @Query(() => [DataAnalytic], { name: 'dataAnalytics' })
  findAll() {
    return this.dataAnalyticsService.findAll();
  }

  @Query(() => [DataAnalytic], { name: 'dataAnalytic' })
  findOne(
    @Args('start_date', { type: () => Date , nullable:true}) start_date?: Date,
    @Args('end_date', {type:()=>Date, nullable:true}) end_date?:Date, 
    @Args('user_id',{type:()=>String}) user_id?: string): Promise<UserAnalytics[]>{
    return this.dataAnalyticsService.userStat(start_date,end_date,user_id);
  }

  // @Mutation(() => DataAnalytic)
  // updateDataAnalytic(@Args('updateDataAnalyticInput') updateDataAnalyticInput: UpdateDataAnalyticInput) {
  //   return this.dataAnalyticsService.update(updateDataAnalyticInput.id, updateDataAnalyticInput);
  // }

  // @Mutation(() => DataAnalytic)
  // removeDataAnalytic(@Args('id', { type: () => Int }) id: number) {
  //   return this.dataAnalyticsService.remove(id);
  // }
}
