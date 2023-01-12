/* eslint-disable no-undef */
import { SeasonStub } from './season.stub';

export const SeasonServiceMock = {
    creatSeason: jest.fn().mockImplementation(() => SeasonStub()),
    season: jest.fn().mockResolvedValue(SeasonStub()),
    count: jest.fn().mockResolvedValue(1),
    seasons: jest.fn().mockResolvedValue([SeasonStub()]),
    updateSeason: jest.fn().mockResolvedValue(SeasonStub()),
    removeSeason: jest.fn().mockResolvedValue(1),
}
  