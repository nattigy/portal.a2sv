import { Test, TestingModule } from '@nestjs/testing';
import { DataAnalyticsService } from './data-analytics.service';

describe('DataAnalyticsService', () => {
  let service: DataAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAnalyticsService],
    }).compile();

    service = module.get<DataAnalyticsService>(DataAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
