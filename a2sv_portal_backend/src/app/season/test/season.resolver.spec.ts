import { Test, TestingModule } from '@nestjs/testing'
import { SeasonResolver } from '../season.resolver'
import { SeasonService } from './../season.service';
import { SeasonServiceMock } from './season.service.mock';
import { Season } from './../entities/season.entity';
import { CreateSeasonInput } from './../dto/create-season.input';
import { SeasonStub } from './season.stub';

describe('SeasonResolver', () => {
  let resolver: SeasonResolver

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonResolver,SeasonService],
    }).overrideProvider(SeasonService).useValue(SeasonServiceMock).compile();

    resolver = module.get<SeasonResolver>(SeasonResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createSeason',()=>{
    describe('create group',()=>{
      let season:Season
      let seasonDto: CreateSeasonInput
  //     name: 'Camp Season',
  // duration: '60',
  // seasonType: '',
  // isActive: true,
  // startDate: new Date('2022-01-01'),
  // endDate: new Date('2022-05-01')
      beforeEach( ()=>{
        seasonDto = SeasonStub()
      })
    })
  })
})
