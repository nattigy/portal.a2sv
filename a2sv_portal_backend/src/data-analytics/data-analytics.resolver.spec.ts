import { Test, TestingModule } from '@nestjs/testing';
import { DataAnalyticsResolver } from './data-analytics.resolver';
import { DataAnalyticsService } from './data-analytics.service';

describe('DataAnalyticsResolver', () => {
  let resolver: DataAnalyticsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAnalyticsResolver, DataAnalyticsService],
    }).compile();

    resolver = module.get<DataAnalyticsResolver>(DataAnalyticsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
