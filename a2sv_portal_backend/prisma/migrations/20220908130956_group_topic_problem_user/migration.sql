/*
  Warnings:

  - A unique constraint covering the columns `[seasonId]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Topic_seasonId_key" ON "Topic"("seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "User_groupId_key" ON "User"("groupId");
