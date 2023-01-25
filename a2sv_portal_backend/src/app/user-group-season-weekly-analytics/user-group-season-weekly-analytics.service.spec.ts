import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupSeasonWeeklyAnalyticsService } from './user-group-season-weekly-analytics.service';

describe('UserGroupSeasonWeeklyAnalyticsService', () => {
  let service: UserGroupSeasonWeeklyAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonWeeklyAnalyticsService],
    }).compile();

    service = module.get<UserGroupSeasonWeeklyAnalyticsService>(UserGroupSeasonWeeklyAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
