import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupSeasonMonthlyAnalyticsService } from './user-group-season-monthly-analytics.service';

describe('UserGroupSeasonMonthlyAnalyticsService', () => {
  let service: UserGroupSeasonMonthlyAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonMonthlyAnalyticsService],
    }).compile();

    service = module.get<UserGroupSeasonMonthlyAnalyticsService>(UserGroupSeasonMonthlyAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
