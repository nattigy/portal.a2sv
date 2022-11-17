import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DataAnalyticsService } from './data-analytics.service';
import { DataAnalytic } from './entities/data-analytic.entity';
import { CreateDataAnalyticInput } from './dto/create-data-analytic.input';
import { UpdateDataAnalyticInput } from './dto/update-data-analytic.input';

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

  @Query(() => DataAnalytic, { name: 'dataAnalytic' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dataAnalyticsService.findOne(id);
  }

  @Mutation(() => DataAnalytic)
  updateDataAnalytic(@Args('updateDataAnalyticInput') updateDataAnalyticInput: UpdateDataAnalyticInput) {
    return this.dataAnalyticsService.update(updateDataAnalyticInput.id, updateDataAnalyticInput);
  }

  @Mutation(() => DataAnalytic)
  removeDataAnalytic(@Args('id', { type: () => Int }) id: number) {
    return this.dataAnalyticsService.remove(id);
  }
}
