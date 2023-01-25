import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupSeasonMonthlyAnalyticsResolver } from './user-group-season-monthly-analytics.resolver';
import { UserGroupSeasonMonthlyAnalyticsService } from './user-group-season-monthly-analytics.service';

describe('UserGroupSeasonMonthlyAnalyticsResolver', () => {
  let resolver: UserGroupSeasonMonthlyAnalyticsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonMonthlyAnalyticsResolver, UserGroupSeasonMonthlyAnalyticsService],
    }).compile();

    resolver = module.get<UserGroupSeasonMonthlyAnalyticsResolver>(UserGroupSeasonMonthlyAnalyticsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
