import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupSeasonWeeklyAnalyticsResolver } from './user-group-season-weekly-analytics.resolver';
import { UserGroupSeasonWeeklyAnalyticsService } from './user-group-season-weekly-analytics.service';

describe('UserGroupSeasonWeeklyAnalyticsResolver', () => {
  let resolver: UserGroupSeasonWeeklyAnalyticsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonWeeklyAnalyticsResolver, UserGroupSeasonWeeklyAnalyticsService],
    }).compile();

    resolver = module.get<UserGroupSeasonWeeklyAnalyticsResolver>(UserGroupSeasonWeeklyAnalyticsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
