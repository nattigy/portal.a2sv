import { SeasonTypeEnum } from "@prisma/client"
export const seasonData = [
   {
        "duration": "2 Months",       
        "name": "Fall-2022",
        "seasonType": SeasonTypeEnum.CAMP,
        "startDate": '2022-11-18T05:48:54.744Z'
   },
   {
        "duration": "3 Months",
        "name": "Summer-2022",
        "seasonType": SeasonTypeEnum.PROJECT,
        "startDate":  '2022-11-18T05:48:54.744Z'
    }
]
export default seasonData