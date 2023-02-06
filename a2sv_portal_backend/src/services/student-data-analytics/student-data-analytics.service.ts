import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDataAnalyticInput } from './dto/create-student-data-analytic.input';
import { UpdateStudentDataAnalyticInput } from './dto/update-student-data-analytic.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StatusEnum } from '@prisma/client';
import { start } from 'repl';

@Injectable()
export class StudentDataAnalyticsService {

  constructor(private prismaService:PrismaService){}
  

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'Scheduler Populate user_data fields',
    timeZone: 'Africa/Addis_Ababa',
  })
  async populateData(seasonId:string) {
    const currentDate = new Date() as any;
    const currentYear = currentDate.getFullYear();
    const startDate = new Date(currentYear,0,1) as any;
    const days = Math.floor((currentDate - startDate) / (1000*60*60*24));
    const weeknubmer = Math.ceil(days / 7);

    // const users = await this.prismaService.user.findMany({
    //   where: {
    //     status: StatusEnum.ACTIVE ,
    //   }
    // });
    // if(!users){
    //   throw new NotFoundException('NO USER IN THE DATABASE');
    // }
    // for (const user of users) {
    //   await this.prismaService.userGroupSeasonDailyAnalytics.upsert({
    //     where: {
    //       userId_createdAt: {
    //         userId: user.id,
    //         createdAt: new Date(),
    //       },
    //     },
    //     create: {
    //       userId: user.id,
    //       createdAt: new Date(),
    //       seasonId,
    //       groupId:user.groupId,
    //       year:currentYear,
    //       week:weeknubmer
    //     },
    //     update: {
    //       userId: user.id,
    //       createdAt: new Date(),
    //       groupId:user.groupId,
    //       year:currentYear,
    //       week:weeknubmer
    //     },
    //   })
    // }
    console.log('===== populating user_stat ======')
  }


  async yearlUserStat( userId: string ,startDate?: Date,endDate?: Date) {
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

    await this.prismaService.userGroupSeasonDailyAnalytics.groupBy({
      by:['year'],
      where:{
        userId,
        createdAt:{
          lte:endDate,
          gte:startDate
        }
      },
      _sum:{
        solvedCount:true,
        wrongCount:true
      }
    })
  }


  //   @Cron(CronExpression.EVERY_HOUR, {
//     name: 'Scheduler Populate user_data fields',
//     timeZone: 'Africa/Addis_Ababa',
//   })
//   async populateData() {
//     const users = await this.prismaService.user.findMany({
//       where: {
//         status: 'ACTIVE' as unknown as Status,
//       },
//       select: {
//         id: true,
//       },
//     })
//     for (const user of users) {
//       await this.prismaService.userAnalytics.upsert({
//         where: {
//           userId_createdAt: {
//             userId: user.id,
//             createdAt: new Date(),
//           },
//         },
//         create: {
//           userId: user.id,
//           createdAt: new Date(),
//         },
//         update: {
//           userId: user.id,
//           createdAt: new Date(),
//         },
//       })
//     }
//     console.log('===== populating user_stat ======')
//   }


//   async userStat(end_date?: Date, user_id?: string) {
//     const date = end_date ? new Date(end_date) : new Date()
//     const start_date = new Date(
//       `${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`,
//     )
//     return this.prismaService.userAnalytics.findMany({
//       where: {
//         userId: user_id,
//         createdAt: {
//           lte: end_date,
//           gte: start_date,
//         },
//       },
//       include: {
//         user: true,
//       },
//       orderBy: {
//         createdAt: 'asc',
//       },
//     })
//   }
// // }

  create(createStudentDataAnalyticInput: CreateStudentDataAnalyticInput) {
    return 'This action adds a new studentDataAnalytic';
  }

  findAll() {
    return `This action returns all studentDataAnalytics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentDataAnalytic`;
  }

  update(id: number, updateStudentDataAnalyticInput: UpdateStudentDataAnalyticInput) {
    return `This action updates a #${id} studentDataAnalytic`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentDataAnalytic`;
  }
}
