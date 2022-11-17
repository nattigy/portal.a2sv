import { PrismaClient } from '@prisma/client'
import { tags } from './seeds/tags'
import { topics } from './seeds/topics'
import { groups } from './seeds/groups';
import { problems } from './seeds/problems';

const prisma = new PrismaClient()

async function main() {
  await prisma.topic.createMany({
      data:topics
  })
  await prisma.group.createMany({
      data:groups
  })
   await prisma.problem.createMany({
      data:problems
  })
  await prisma.tag.createMany({
    data: tags,
  })

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })