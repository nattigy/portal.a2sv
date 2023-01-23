import { Test, TestingModule } from '@nestjs/testing'
import { SeasonResolver } from '../season.resolver'
import { SeasonService } from './../season.service';
import { SeasonServiceMock } from './season.service.mock';
import { Season } from './../entities/season.entity';
import { CreateSeasonInput } from './../dto/create-season.input';
import { SeasonStub } from './season.stub';

describe('SeasonResolver', () => {
  let seasonService: SeasonService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonResolver,SeasonService],
    }).overrideProvider(SeasonService).useValue(SeasonServiceMock).compile();

    seasonService = module.get<SeasonService>(SeasonService)
  })

  it('should be defined', () => {
    expect(seasonService).toBeDefined()
  })

  describe('createSeason',()=>{
    it('should create group',async ()=>{
    const createSeasonDto = {
      name: 'Camp Season',
      duration: '60',
      seasonType: '',
      isActive: true,
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-05-01')
    } as unknown as CreateSeasonInput
    const season = await seasonService.createSeason(createSeasonDto)
    jest.spyOn(seasonService,'season').getMockImplementation()
    expect(await seasonService.season(season.id)).toEqual(SeasonStub())
  })
  })

    it('find list of season',async ()=>{
     jest.spyOn(seasonService,'season').getMockImplementation()
     const seasons = await seasonService.seasons({});
     expect(seasons).toEqual([SeasonStub()]);
     expect(seasons).toHaveLength(1);
    })


})
  
