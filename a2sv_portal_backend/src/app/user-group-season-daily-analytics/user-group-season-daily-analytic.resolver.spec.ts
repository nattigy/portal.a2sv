import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupSeasonDailyAnalyticResolver } from './user-group-season-daily-analytic.resolver';

describe('UserGroupSeasonDailyAnalyticResolver', () => {
  let resolver: UserGroupSeasonDailyAnalyticResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonDailyAnalyticResolver],
    }).compile();

    resolver = module.get<UserGroupSeasonDailyAnalyticResolver>(UserGroupSeasonDailyAnalyticResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
