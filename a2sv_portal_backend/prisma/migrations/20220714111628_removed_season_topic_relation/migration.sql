/*
  Warnings:

  - You are about to drop the column `season_id` on the `Topic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_season_id_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "season_id";
