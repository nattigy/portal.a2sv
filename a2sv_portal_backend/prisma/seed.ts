import { PrismaClient } from '@prisma/client'
import { env } from 'process'
import { groups } from './seeds/groups'
import { problems } from './seeds/problems'
import { tags } from './seeds/tags'
import { topics } from './seeds/topics'
import users from './seeds/users'

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

    // await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS ${dbName}`)
    // await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
    await prisma.topic.createMany({
      data: topics,
    })
    await prisma.group.createMany({
      data: groups,
    })
    await prisma.problem.createMany({
      data: problems,
    })
    await prisma.tag.createMany({
      data: tags,
    })
    await prisma.user.createMany({
      data: users,
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
main()
