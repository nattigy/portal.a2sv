import { SeasonTypeEnum } from '@prisma/client'
export const SeasonStub = () => ({
  id: '1',
  name: 'Camp Season',
  duration: '60',
  seasonType: SeasonTypeEnum.CAMP,
  isActive: true,
  startDate: new Date('2022-01-01'),
  endDate: new Date('2022-05-01'),
})
