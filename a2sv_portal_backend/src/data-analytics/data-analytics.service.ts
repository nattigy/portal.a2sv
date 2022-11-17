import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Status, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDataAnalyticInput } from './dto/create-data-analytic.input';
import { UpdateDataAnalyticInput } from './dto/update-data-analytic.input';

@Injectable()
export class DataAnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT,{name:'Scheduler Populate data fields', 
      timeZone: 'Europe/Paris'})

    async populateData() {   
    //iterate for each user creat a default record 
    
    // fetch user>group>seasonTopics>problems
  //   const users = await this.prismaService.userContestProblem.findMany({
  //     where: {
  //       status: "ACTIVE" as unknown as Status
  //     },
  //     include:{
  //       group:{
  //         include:{
  //           seasons:{
  //           }
  //         }
  //       }
  //     }
  //   })
  
  
  const users = await this.prismaService.user.findMany({
    where:{
      status: "ACTIVE" as unknown as Status
    },
    select:{
      id:true
    }
  })
  for(const user in users){
    await this.prismaService.userAnalytics.create({
      data:{
          userId:user.id
        }
    })  
  }
}




  create(createDataAnalyticInput: CreateDataAnalyticInput) {
    return 'This action adds a new dataAnalytic';
  }

  findAll() {
    return `This action returns all dataAnalytics`;
  }

  async userStat(start_date:Date,end_date:Date, user_id:string) {
    if (!start_date){
      const date = new Date();
      start_date = new Date(`${date.getFullYear}-01-01`)
    }
    if(!end_date){
      end_date = new Date();
    }

    this.prismaService.userAnalytics.findMany({
      where{
        userid:user_id,
        createdAt:{
          lte:end_date,
          gte:start_date
        }
      }
    })
     
  }

  update(id: number, updateDataAnalyticInput: UpdateDataAnalyticInput) {
    return `This action updates a #${id} dataAnalytic`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataAnalytic`;
  }
}
