import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Status } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDataAnalyticInput } from './dto/create-data-analytic.input'

@Injectable()
export class DataAnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR,{name:'Scheduler Populate user_data fields', 
      timeZone: 'Africa/Addis_Ababa'})
 async populateData() {   
    const users = await this.prismaService.user.findMany({
      where: {
        status: 'ACTIVE' as unknown as Status,
      },
      select: {
        id: true,
      },
    })
    for (const user of users) {
      await this.prismaService.userAnalytics.upsert({
        where: {
          userId_createdAt: {
            userId: user.id,
            createdAt: new Date(),
          },
        },
        create: {
          userId: user.id,
          createdAt: new Date(),
        },
        update: {
          userId: user.id,
          createdAt: new Date(),
        },
      })
    }
    // for(const user of users){
    //   await this.prismaService.userAnalytics.create({
    //     data:{
    //       userId:user.id,
    //       createdAt:new Date()
    //     }
    //   })
    // }
    console.log('=====poupulating user_stat======')
  }

  create(createDataAnalyticInput: CreateDataAnalyticInput) {
    return 'This action adds a new dataAnalytic'
  }

  findAll() {
    return `This action returns all dataAnalytics`
  }


  async userStat(end_date?:Date, user_id?:string) {
      const date = end_date ? new Date(end_date) : new Date();
      const start_date = new Date(`${date.getFullYear()-1}-${date.getMonth()}-${date.getDate()}`)
    return this.prismaService.userAnalytics.findMany({
      where: {
        userId: user_id,
        createdAt: {
          lte: end_date,
          gte: start_date,
        },
      },
      include: {
        user: true,
      },
      orderBy: {    
        createdAt: 'asc'   
     }
    })
  }
}
