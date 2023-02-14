import { Test, TestingModule } from '@nestjs/testing';
import { ManageGroupSeasonResolver } from './manage-group-season.resolver';
import { ManageGroupSeasonService } from './manage-group-season.service';

describe('ManageGroupSeasonResolver', () => {
  let resolver: ManageGroupSeasonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageGroupSeasonResolver, ManageGroupSeasonService],
    }).compile();

    resolver = module.get<ManageGroupSeasonResolver>(ManageGroupSeasonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
