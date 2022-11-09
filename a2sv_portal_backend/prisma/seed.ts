import { PrismaClient } from '@prisma/client'
import { tags } from './seeds/tags'

const prisma = new PrismaClient()

async function main() {
  // await prisma.topic.createMany({
  //     data:topics
  // })
  // await prisma.group.createMany({
  //     data:group
  // })
  //  await prisma.problem.createMany({
  //     data:problems
  // })
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