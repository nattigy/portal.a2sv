/*
  Warnings:

  - You are about to drop the `GroupOnTopicOnSeason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupOnTopicOnSeason" DROP CONSTRAINT "GroupOnTopicOnSeason_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupOnTopicOnSeason" DROP CONSTRAINT "GroupOnTopicOnSeason_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "GroupOnTopicOnSeason" DROP CONSTRAINT "GroupOnTopicOnSeason_topicId_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "groupId" INTEGER;

-- DropTable
DROP TABLE "GroupOnTopicOnSeason";

-- DropTable
DROP TABLE "Season";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
