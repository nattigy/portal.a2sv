/*
  Warnings:

  - A unique constraint covering the columns `[headId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "headId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "groupId" INTEGER;

-- CreateTable
CREATE TABLE "GroupTopicSeason" (
    "groupId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupTopic_pkey" PRIMARY KEY ("groupId","topicId")
);

-- CreateTable
CREATE TABLE "GroupTopicSeasonProblem" (
    "problemId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupTopicProblem_pkey" PRIMARY KEY ("problemId","groupId","topicId")
);

-- CreateTable
CREATE TABLE "GroupTopicSeasonProblemUser" (
    "problemId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "solved" BOOLEAN NOT NULL DEFAULT false,
    "solutionLink" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "needHelp" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GroupTopicProblemUser_pkey" PRIMARY KEY ("groupId","topicId","problemId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_headId_key" ON "Group"("headId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_headId_fkey" FOREIGN KEY ("headId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTopicSeason" ADD CONSTRAINT "GroupTopic_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTopicSeason" ADD CONSTRAINT "GroupTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTopicSeasonProblem" ADD CONSTRAINT "GroupTopicProblem_groupId_topicId_fkey" FOREIGN KEY ("groupId", "topicId") REFERENCES "GroupTopicSeason"("groupId", "topicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTopicSeasonProblem" ADD CONSTRAINT "GroupTopicProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTopicSeasonProblemUser" ADD CONSTRAINT "GroupTopicProblemUser_groupId_topicId_problemId_fkey" FOREIGN KEY ("groupId", "topicId", "problemId") REFERENCES "GroupTopicSeasonProblem"("groupId", "topicId", "problemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTopicSeasonProblemUser" ADD CONSTRAINT "GroupTopicProblemUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
