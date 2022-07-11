import { PrismaClient } from '@prisma/client';
import { groups } from './groups';
import { regions } from './regions';

const prisma = new PrismaClient();
async function main() {
  // const user1 =  await prisma.user.upsert(
  //     where: {email:'admin@gmail.com'},
  //     update:{},
  //     create:{
  //         email:'admin@gmail.com',
  //         password:'qwert'
  //     }
  // )

  for (let region of regions) {
    await prisma.region.create({
      data: region,
    });
  }

  for (let group of groups) {
    await prisma.group.create({
      data: group,
    });
  }
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
