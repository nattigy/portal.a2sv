import { PrismaClient } from '@prisma/client'
import { env } from 'process'
// import { groupsData } from './seeds/groupsData'
// import { tagData } from './seeds/tagData'
// import { topicData } from './seeds/topicData'
// import { userData } from './seeds/userData'
// import contestData from './seeds/contestData'
// import problemData from './seeds/problemData'

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
    const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`
  
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
  
    // await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS ${dbName}`)
    // await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
  //   await prisma.topic.createMany({
  //     data: topicData,
  //   })
  //   console.log('topic')
  //   await prisma.group.createMany({
  //     data: groupsData,
  //   })
  //   console.log('group')
  //   for (let i = 0; i < problemData.length; i++) {
  //     await prisma.problem.create({
  //       data: {
  //         ...problemData[i],
  //         tags: {
  //           connectOrCreate: problemData[i].tags.map(({ name }) => ({
  //             where: {
  //               name,
  //             },
  //             create: {
  //               name,
  //             },
  //           })),
  //         },
  //       },
  //     })
  //   }
  //   console.log('problem')
  //   await prisma.tag.createMany({
  //     data: tagData,
  //   })
  //   console.log('tag')
  //   await prisma.user.createMany({
  //     data: userData,
  //   })
  //   console.log('user')
  //   const problems = await prisma.problem.findMany({})
  //   for (let i = 0; i < contestData.length; i++) {
  //     await prisma.contest.create({
  //       data: {
  //         name: contestData[i].name,
  //         link: 'link1',
  //         startTime: '2022-11-18T05:48:54.744Z',
  //         endTime: '2022-11-18T05:48:54.744Z',
  //         problems: {
  //           connect: problems.map(p => ({ id: p.id })),
  //         },
  //       },
  //     })
  //   }
  //   console.log('contest')
  //
  //   const groups = await prisma.group.findMany({})
  //   const contests = await prisma.contest.findMany({})
  //   for (const group of groups) {
  //     await prisma.groupContest.create({
  //       data: {
  //         groupId: group.id,
  //         contestId: contests[0].id,
  //       },
  //     })
  //     await prisma.season.create({
  //       data: {
  //         groupId: group.id,
  //         name: 'edu season',
  //         seasonType: 'EDUCATION',
  //       },
  //     })
  //   }
  //   console.log('topic')
  //   const users = await prisma.user.findMany({})
  //   let k = 0
  //   for (const user of users) {
  //     await prisma.user.update({
  //       where: {
  //         id: user.id,
  //       },
  //       data: {
  //         groupId: groups[k % groups.length].id,
  //       },
  //     })
  //     k++
  //   }
  //   console.log('user')
  //   const seasons = await prisma.season.findMany({})
  //   const topics = await prisma.topic.findMany({})
  //   let i = 0
  //   for (const season of seasons) {
  //     await prisma.seasonTopic.create({
  //       data: {
  //         seasonId: season.id,
  //         topicId: topics[i % topics.length].id,
  //       },
  //     })
  //     i++
  //   }
  //   console.log('seasonTopic')
  //   const seasonTopics = await prisma.seasonTopic.findMany({})
  //   for (const seasonTopic of seasonTopics) {
  //     for (const problem of problems) {
  //       await prisma.seasonTopicProblem.create({
  //         data: {
  //           seasonId: seasonTopic.seasonId,
  //           topicId: seasonTopic.topicId,
  //           problemId: problem.id,
  //         },
  //       })
  //     }
  //   }
  //   console.log('seasonTopicProblem')
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
