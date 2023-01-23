import { JoinRequestEnum, PrismaClient } from '@prisma/client'
import { env } from 'process'
import groupsData from './seeds/groupsData'
import problemData from './seeds/problemData'
import seasonData from './seeds/seasonData'
import tagData from './seeds/tagData'
import topicData from './seeds/topicData'
import userData from './seeds/userData'
import contestData from './seeds/contestData'

const prisma = new PrismaClient()

async function main() {
  const dbName = env.POSTGRES_DB
  try {
    // await prisma.topic.deleteMany()
    // console.log('Deleted records in topic table')
    // await prisma.group.deleteMany()
    // console.log('Deleted records in topic table')
    // await prisma.tag.deleteMany()
    // console.log('Deleted records in topic table')
    // await prisma.problem.deleteMany()
    // console.log('Deleted records in topic table')
    const tablenames = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`
    
    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter(name => name !== '_prisma_migrations')
      .map(name => `"public"."${name}"`)
      .join(', ')

    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
    } catch (error) {
      console.log({ error })
    }

    await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS "${dbName};"`)
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
    await prisma.topic.createMany({
      data: topicData,
    })
    await prisma.season.createMany({
      data: seasonData,
    })
    //   console.log('topic')
    await prisma.group.createMany({
      data: groupsData,
    })
    // //   console.log('group')
    // await prisma.problem.createMany({
    //   data: problemData,
    // })
      for (let i = 0; i < problemData.length; i++) {
        await prisma.problem.create({
          data: {
            ...problemData[i],
            tags: {
              connectOrCreate: problemData[i].tags.map(t => ({
                where: { name: t.name },
                create: { name: t.name },
              })),
            },
            // tags: {
            //   connectOrCreate: problemData[i].tags.map(({ name }) => ({
            //     where: {
            //       name,
            //     },
            //     create: {
            //       name,
            //     },
            //   })),
            // },
          },
        })
      }
      console.log('problem')
    await prisma.tag.createMany({
      data: tagData,
    })
    // //   console.log('tag')
    await prisma.user.createMany({
      data: userData,
    })
    //   console.log('user')
      const problems = await prisma.problem.findMany({})
    //   for (let i = 0; i < contestData.length; i++) {
        await prisma.contest.create({
          data: {
            name: contestData[0].name,
            link: 'link1',
            startTime: '2022-11-18T05:48:54.744Z',
            endTime: '2022-11-18T05:48:54.744Z',
            div:"Div-2",
            problems: {
              connect: problems.map(p => ({ id: p.id })),
            },
          },
        })

    console.log("add users to a group")
    const users = await prisma.user.findMany({})
    const group = await prisma.group.findFirst({})
    await prisma.user.updateMany({
      where: {
        id: { in: users.map(u => u.id) },
      },
      data: {
        groupId: group.id
      }
    })

    console.log("add seasons to groups")
    const groups = await prisma.group.findMany({})
    const season = await prisma.season.findFirst({})
    await prisma.season.update({
      where: {id: season.id},
      data: {isActive: true}
    })
    const headUser = users.filter(u => u.email === "nathnael.akale@a2sv.org")[0]
    await prisma.group.update({
      where: {
        id: group.id
      },
      data: {
        headId: headUser.id
      }
    })
    await prisma.groupSeason.createMany({
      data: groups.map(g => ({
        groupId: g.id,
        seasonId: season.id,
        headId: headUser.id,
        startDate: '2022-12-30T12:22:34.313Z'
      }))
    })

    await prisma.groupSeason.update({
      where: {
        groupId_seasonId: {
          groupId: group.id,
          seasonId: season.id
        }
      },
      data: {
         isActive: true,
        joinRequest: JoinRequestEnum.APPROVED
      }
    })

    console.log("Add topics to a season and group season")
    const topics = await prisma.topic.findMany({})
    const ps = await prisma.problem.findMany({})
    await prisma.seasonTopic.createMany({
      data: topics.map(t => ({
        seasonId: season.id,
        topicId: t.id,
      }))
    })
    await prisma.seasonTopicProblem.createMany({
      data: ps.map(p => ({
        seasonId: season.id,
        problemId: p.id,
        topicId: topics[0].id
      }))
    })
    await prisma.groupSeasonTopic.createMany({
      data: topics.map(t => ({
        seasonId: season.id,
        topicId: t.id,
        groupId: group.id,
      }))
    })
    await prisma.groupSeasonTopicProblem.createMany({
      data: ps.map(p => ({
        seasonId: season.id,
        problemId: p.id,
        topicId: topics[0].id,
        groupId: group.id
      }))
    })

    //   const endYear = new Date('2023-1-1')
    //   const analyticsList = []
    //   for (let d = new Date('2022-1-2'); d <= endYear; d.setDate(d.getDate() + 1)) {
    //     for (const user of users) {
    //       analyticsList.push({
    //         userId: user.id,
    //         createdAt: new Date(d),
    //         solvedCount: Math.floor(Math.random() * 10),
    //         wrongCount: Math.floor(Math.random() * 10) + 1,
    //       })
    //     }
    //   }
    //   await prisma.userAnalytics.createMany({
    //     data: analyticsList,
    //   })
    //   console.log('userAnalytics')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
