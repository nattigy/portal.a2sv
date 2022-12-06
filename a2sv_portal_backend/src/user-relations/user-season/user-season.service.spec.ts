import { Test, TestingModule } from '@nestjs/testing';
import { UserSeasonService } from './user-season.service';

describe('UserSeasonService', () => {
  let service: UserSeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonService],
    }).compile();

    service = module.get<UserSeasonService>(UserSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
