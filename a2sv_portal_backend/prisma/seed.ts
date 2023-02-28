import { JoinRequestEnum, PrismaClient, RoleEnum, UserContestProblemStatusEnum } from '@prisma/client'
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
    console.log('topics created')

    await prisma.season.createMany({
      data: seasonData,
    })
    console.log('seasons created')

    await prisma.group.createMany({
      data: groupsData,
    })
    console.log('group created')

    for (const problemDatum of problemData) {
      await prisma.problem.create({
        data: {
          ...problemDatum,
          tags: {
            connectOrCreate: problemDatum.tags.map(t => ({
              where: { name: t.name },
              create: { name: t.name },
            })),
          },
        },
      })
    }
    console.log('problems created')

    await prisma.tag.createMany({
      skipDuplicates: true,
      data: tagData,
    })
    console.log('tags created')

    await prisma.user.createMany({
      data: userData,
    })
    console.log('users created')

    await prisma.contest.createMany({
      data: contestData,
    })
    console.log('contests created')

    const contests = await prisma.contest.findMany({})
    let problems = await prisma.problem.findMany({})
    for (const contest of contests) {
      await prisma.contestProblem.createMany({
        skipDuplicates: true,
        data: problems.splice(Math.floor(Math.random() * problems.length), 3)
          .map(p => ({ problemId: p.id, contestId: contest.id })),
      })
    }
    console.log('added problems to contests')

    let users = await prisma.user.findMany({})
    let groups = await prisma.group.findMany()
    for (const user of users) {
      if (user.role === RoleEnum.STUDENT) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            groupId: groups.filter(g => g.name === 'Group-31')[0].id,
          },
        })
      } else {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            groupId: groups.filter(g => g.name === 'Group-12')[0].id,
          },
        })
      }
    }
    console.log('added users to a group')

    const g12 = await prisma.group.findFirst({ where: { name: 'Group-12' } })
    const g31 = await prisma.group.findFirst({ where: { name: 'Group-31' } })
    const emre = await prisma.user.findFirst({ where: { email: 'emre@a2sv.org' } })
    const sura = await prisma.user.findFirst({ where: { email: 'surafel@a2sv.org' } })
    await prisma.group.update({
      where: { id: g12.id },
      data: { headId: emre.id }
    })
    await prisma.group.update({
      where: { id: g31.id },
      data: { headId: sura.id }
    })
    console.log('assign heads to a group')

    const g12Season = await prisma.season.findFirst({})
    const g31Season = await prisma.season.findFirst({})
    const seasons = await prisma.season.findMany({})

    await prisma.season.update({
      where: { id: g12Season.id },
      data: { isActive: true },
    })
    await prisma.season.update({
      where: { id: g31Season.id },
      data: { isActive: true },
    })

    groups = await prisma.group.findMany({ include: { head: true } })
    for (const season1 of seasons) {
      await prisma.groupSeason.createMany({
        data: groups.filter(g => g.headId !== null).map(g => ({
          groupId: g.id,
          seasonId: season1.id,
          startDate: '2022-12-30T12:22:34.313Z',
        })),
      })
    }

    await prisma.groupSeasonHead.create({
      data: {
        groupId: g12.id,
        seasonId: g12Season.id,
        headId: emre.id,
      },
    })
    await prisma.groupSeasonHead.create({
      data: {
        groupId: g31.id,
        seasonId: g31Season.id,
        headId: sura.id,
      },
    })

    await prisma.groupSeason.update({
      where: {
        groupId_seasonId: {
          groupId: g12.id,
          seasonId: g12Season.id,
        },
      },
      data: {
        isActive: true,
        joinRequest: JoinRequestEnum.APPROVED,
      },
    })
    await prisma.groupSeason.update({
      where: {
        groupId_seasonId: {
          groupId: g31.id,
          seasonId: g31Season.id,
        },
      },
      data: {
        isActive: true,
        joinRequest: JoinRequestEnum.APPROVED,
      },
    })
    console.log('added seasons to a group')

    await prisma.groupSeasonContest.createMany({
      skipDuplicates: true,
      data: contests.map(c => ({
        groupId: g12.id,
        seasonId: g12Season.id,
        contestId: c.id,
      })),
    })
    // fetch groupSeasonContests for g12, include contestProblems
    // for each groupSeasonContests and for each contestProblems under the curr groupSeason
    // create groupSeasonContestProblem, don't pass ids, rather use connect with groupSeasonContest and contestProblem

    await prisma.groupSeasonContest.createMany({
      skipDuplicates: true,
      data: contests.map(c => ({
        groupId: g31.id,
        seasonId: g31Season.id,
        contestId: c.id,
      })),
    })
    console.log('Added contests to a groupSeasons')
    // fetch groupSeasonContests for g31, include contestProblems
    // for each groupSeasonContests and for each contestProblems under the curr groupSeason
    // create groupSeasonContestProblem, don't pass ids, rather use connect with groupSeasonContest and contestProblem

    const topics = await prisma.topic.findMany({})
    for (const season of seasons) {
      await prisma.seasonTopic.createMany({
        data: topics.map(t => ({
          seasonId: season.id,
          topicId: t.id,
        })),
      })
    }
    console.log('Added topics to a season and group season')

    problems = await prisma.problem.findMany({})
    const seasonTopics = await prisma.seasonTopic.findMany({})
    for (const seasonTopic of seasonTopics) {
      await prisma.seasonTopicProblem.createMany({
        data: problems.map(p => ({
          seasonId: seasonTopic.seasonId,
          problemId: p.id,
          topicId: seasonTopic.topicId,
        })),
      })
    }
    console.log('Added problems to season topics')

    await prisma.groupSeasonTopic.createMany({
      skipDuplicates: true,
      data: seasonTopics.map(t => ({
        seasonId: t.seasonId,
        topicId: t.topicId,
        groupId: g12.id,
      })),
    })
    await prisma.groupSeasonTopic.createMany({
      data: seasonTopics.map(t => ({
        seasonId: t.seasonId,
        topicId: t.topicId,
        groupId: g31.id,
      })),
    })
    console.log('Add topics to group seasons')

    const groupSeasonTopics = await prisma.groupSeasonTopic.findMany({})
    for (const groupSeasonTopic of groupSeasonTopics) {
      await prisma.groupSeasonTopicProblem.createMany({
        data: problems.map(p => ({
          seasonId: groupSeasonTopic.seasonId,
          problemId: p.id,
          topicId: groupSeasonTopic.topicId,
          groupId: groupSeasonTopic.groupId,
        })),
      })
    }
    console.log('Add problems to group season topics')

    users = await prisma.user.findMany({})
    for (const user of users) {
      const userGroup = await prisma.group.findUnique({
        where: { id: user.groupId },
      })
      const userSeason = await prisma.groupSeason.findFirst({
        where: {
          isActive: true,
          groupId: userGroup.id,
        },
      })
      await prisma.userGroupSeason.upsert({
        where: {
          userId_groupId_seasonId: {
            userId: user.id,
            groupId: userGroup.id,
            seasonId: userSeason.seasonId,
          },
        },
        create: {
          userId: user.id,
          groupId: userGroup.id,
          seasonId: userSeason.seasonId,
        },
        update: {
          userId: user.id,
          groupId: userGroup.id,
          seasonId: userSeason.seasonId,
        },
      })
    }
    console.log('Add user group season relation for all users')

    const endYear = new Date('2023-1-31')
    const analyticsList = []
    const userGroupSeasons = await prisma.user.findMany({
      include: {
        group: {
          include: { groupSeasons: { take: 1, where: { isActive: true } } },
        },
      },
    })

    interface obj {
      seasonId: string
    }

    const userSeasonMapping: { ['key']?: obj } = {}
    for (const userGroupSeason of userGroupSeasons) {
      userSeasonMapping[userGroupSeason.id] = {
        seasonId: userGroupSeason.group.groupSeasons[0].seasonId,
      }
    }
    // eslint-disable-next-line no-unmodified-loop-condition
    for (let d = new Date('2022-1-2'); d <= endYear; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d) as any
      currentDate.setHours(0, 0, 0, 0)
      const currentYear = currentDate.getFullYear()
      const startDate = new Date(currentYear, 0, 1) as any
      const days = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24))
      const weeknubmer = Math.ceil(days / 7)
      for (const user of users) {
        analyticsList.push({
          userId: user.id,
          seasonId: userSeasonMapping[user.id].seasonId,
          groupId: user.groupId,
          createdAt: new Date(d),
          solvedCount: Math.floor(Math.random() * 10),
          wrongCount: Math.floor(Math.random() * 10) + 1,
          week: weeknubmer,
          month: currentDate.getMonth(),
          year: currentDate.getFullYear(),
        })
      }
    }

    await prisma.userGroupSeasonDataAnalytics.createMany({
      data: analyticsList,
      skipDuplicates: true,
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
