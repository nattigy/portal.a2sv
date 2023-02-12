import { Test, TestingModule } from '@nestjs/testing';
import { StudentDataAnalyticsService } from './student-data-analytics.service';

describe('StudentDataAnalyticsService', () => {
  let service: StudentDataAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentDataAnalyticsService],
    }).compile();

    service = module.get<StudentDataAnalyticsService>(StudentDataAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
