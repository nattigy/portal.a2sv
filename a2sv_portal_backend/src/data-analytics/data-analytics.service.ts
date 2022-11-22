import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Status, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDataAnalyticInput } from './dto/create-data-analytic.input';
import { UpdateDataAnalyticInput } from './dto/update-data-analytic.input';

@Injectable()
export class DataAnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT,{name:'Scheduler Populate user_data fields', 
      timeZone: 'Africa/Addis_Ababa'})
 async populateData() {   
      const users = await this.prismaService.user.findMany({
        where:{
          status: "ACTIVE" as unknown as Status
        },
        select:{
          id:true
        }
      })
      for(const user of users){
        await this.prismaService.userAnalytics.upsert({
          where:{
            userId_createdAt: {
              userId:user.id,
            createdAt: new Date()
            }
          },
          create: {
            userId:user.id,
            createdAt: new Date()
          },
          update: {
            userId:user.id,
            createdAt: new Date()
          },
        
        })  
  }
  console.log("=====poupulating user_stat======");
  // for(const user of users){
  //   await this.prismaService.userAnalytics.create({
  //     data:{
  //       userId:user.id,
  //       createdAt:new Date()
  //     }
  //   })
  // }
  //sort by date

}




  create(createDataAnalyticInput: CreateDataAnalyticInput) {
    return 'This action adds a new dataAnalytic';
  }

  findAll() {
    return `This action returns all dataAnalytics`;
  }

  async userStat(start_date?:Date,end_date?:Date, user_id?:string) {
    if (!start_date){
      const date = new Date();
      start_date = new Date(`${date.getFullYear()-1}-${date.getMonth()}-${date.getDate()}`)
    }
    if(!end_date){
      end_date = new Date();
    }
    const user_stat  = await this.prismaService.userAnalytics.findMany({
      where:{
        userId:user_id,
        createdAt:{
          lte:end_date,
          gte:start_date
        }
      },
      include:{
        user:true
      },
      orderBy: {    
        createdAt: 'asc'   
     }
    })
    return user_stat; 
  }
}
