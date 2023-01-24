import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupSeasonDailyAnalyticsService } from './user-group-season-daily-analytics.service';

describe('UserGroupSeasonDailyAnalyticsService', () => {
  let service: UserGroupSeasonDailyAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonDailyAnalyticsService],
    }).compile();

    service = module.get<UserGroupSeasonDailyAnalyticsService>(UserGroupSeasonDailyAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
