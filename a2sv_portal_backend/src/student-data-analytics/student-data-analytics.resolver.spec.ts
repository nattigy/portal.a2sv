import { Test, TestingModule } from '@nestjs/testing';
import { StudentDataAnalyticsResolver } from './student-data-analytics.resolver';
import { StudentDataAnalyticsService } from './student-data-analytics.service';

describe('StudentDataAnalyticsResolver', () => {
  let resolver: StudentDataAnalyticsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentDataAnalyticsResolver, StudentDataAnalyticsService],
    }).compile();

    resolver = module.get<StudentDataAnalyticsResolver>(StudentDataAnalyticsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
