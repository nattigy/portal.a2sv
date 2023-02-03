import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StatusEnum, UserTopicProblemStatusEnum } from '@prisma/client';
import { UserGroupSeasonDailyAnalyticInput } from 'dist/src/app/user-group-season-daily-analytics/dto/user-group-season-daily-analytic.input';


@Injectable()
export class StudentDataAnalyticsService {
  constructor(private prismaService:PrismaService){}
  
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'Scheduler Populate user_data fields',
    timeZone: 'Africa/Addis_Ababa',
  })
  async populateData() {
    const currentDate = new Date() as any;
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const startDate = new Date(currentYear,0,1) as any;
    const days = Math.floor((currentDate - startDate) / (1000*60*60*24));
    const weeknubmer = Math.ceil(days / 7);

    const users = await this.prismaService.user.findMany({
        where: {
          status: StatusEnum.ACTIVE ,
        }
    });
    if(!users){
        throw new NotFoundException('NO USER IN THE DATABASE');
    }

    const activeSeason = await this.prismaService.season.findMany({
      where:{
        isActive : true
      }
    })
    const seasonId = activeSeason[0].id
    for (const user of users) {
      await this.prismaService.userGroupSeasonDailyAnalytics.upsert({
        where: {
          userId_createdAt: {
          userId: user.id,
          createdAt: new Date(),
          },
        },
        create: {
          userId: user.id,
          createdAt: new Date(),
          seasonId,
          groupId:user.groupId,
          year:currentYear,
          week:weeknubmer,
          month:currentMonth
        },
        update: {
          userId: user.id,
          createdAt: new Date(),
          groupId:user.groupId,
          year:currentYear,
          week:weeknubmer
        },
        })
      }
    console.log('===== populating user_stat ======')
  }


  async yearlUserStat(seasonId:string, userId: string ,startDate?: Date,endDate?: Date) {
    // const date = end_date ? new Date(end_date) : new Date()
    // const start_date = new Date(
    //   `${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`,
    // )
    // return this.prismaService.userAnalytics.findMany({
    //   where: {
    //     userId: user_id,
    //     createdAt: {
    //       lte: end_date,
    //       gte: start_date,
    //     },
    //   },
    //   include: {
    //     user: true,
    //   },
    //   orderBy: {
    //     createdAt: 'asc',
    //   },
    // })
    const date = endDate ? new Date(endDate) : new Date()
    const start = new Date(
      `${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`,
    )
    return await this.prismaService.userGroupSeasonDailyAnalytics.groupBy({
      by:['year'],
      where:{
        userId,
        createdAt:{
          lte:endDate,
          gte:start
        },
        seasonId
      },
      
      _sum:{
        solvedCount:true,
        wrongCount:true
      }
    })
  }

  async weeklyUserStart(userId:string, seasonId:string,startDate?:Date,endDate?:Date){
    const date = endDate ? new Date(endDate) : new Date()
    const start = startDate? new Date(startDate) : new Date(
      `${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`,
    )
    return await this.prismaService.userGroupSeasonDailyAnalytics.groupBy({
      by:['week'],
      where:{
        userId,
        createdAt:{
          lte:endDate,
          gte:start
        },
        seasonId
      }, 
      _sum:{
        solvedCount:true,
        wrongCount:true
      }
    })
  }

  async montlyUserStart(userId:string, seasonId:string,startDate?:Date,endDate?:Date){
    const date = endDate ? new Date(endDate) : new Date()
    const start = new Date(
      `${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`,
    )
    return await this.prismaService.userGroupSeasonDailyAnalytics.groupBy({
      by:['month'],
      where:{
        userId,
        createdAt:{
          lte:endDate,
          gte:start
        },
        seasonId
      }, 
      _sum:{
        solvedCount:true,
        wrongCount:true
      }
    })
  }


  async userStat(userId:string, seasonId:string,startDate?:Date, endDate?: Date) {
    const date = endDate ? new Date(endDate) : new Date()
    const start = startDate ? new Date(startDate) : new Date(
      `${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`,
    )
    const user = await this.prismaService.user.findUniqueOrThrow({
      where:{
        id:userId
      }
    })
    return this.prismaService.userGroupSeasonDailyAnalytics.findMany({
      where: {
        userId,
        groupId: user.groupId,
        seasonId,
        createdAt: {
          lte: endDate,
          gte: start,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

async upsert({ userId, groupId, seasonId, createdAt }: UserGroupSeasonDailyAnalyticInput) {
  // const userProblems = await this.prismaService.userGroupSeasonTopicProblem.findMany({
  //   where: {
  //     userId,
  //     groupId,
  //     seasonId,
  //     statusUpdatedAt: createdAt,
  //   },
  // })

  // return this.prismaService.userGroupSeasonDailyAnalytics.upsert({
  //   where: {
  //     userId_createdAt: {
  //       userId,
  //       createdAt,
  //     },
  //   },
  //   create: {
  //     userId,
  //     groupId,
  //     seasonId,
  //     solvedCount: userProblems.filter(up => up.status === UserTopicProblemStatusEnum.SOLVED)
  //       .length,
  //     wrongCount: userProblems.map(up => up.status === UserTopicProblemStatusEnum.SOLVED ? up.numberOfAttempts - 1 : up.numberOfAttempts).reduce((a, b) => a + b, 0),
  //   },
  //   update: {
  //     userId,
  //     groupId,
  //     seasonId,
  //     solvedCount: userProblems.filter(up => up.status === UserTopicProblemStatusEnum.SOLVED)
  //       .length,
  //     wrongCount: userProblems.map(up => up.status === UserTopicProblemStatusEnum.SOLVED ? up.numberOfAttempts - 1 : up.numberOfAttempts).reduce((a, b) => a + b, 0),
  //   },
  // })
  }

}
