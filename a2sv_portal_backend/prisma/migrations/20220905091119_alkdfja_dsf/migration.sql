/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Season` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_seasonId_fkey";

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "seasonId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "Season"("name");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;
