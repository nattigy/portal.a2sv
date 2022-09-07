/*
  Warnings:

  - You are about to drop the column `user_id` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_user_id_fkey";

-- DropIndex
DROP INDEX "UserProfile_user_id_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "user_id",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "codeforces" TEXT,
ADD COLUMN     "educationDegree" TEXT,
ADD COLUMN     "educationField" TEXT,
ADD COLUMN     "educationPlace" TEXT,
ADD COLUMN     "educationYear" INTEGER,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "geekforgeeks" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "graduationYear" INTEGER,
ADD COLUMN     "hackerrank" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "leetcode" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "resumeLink" TEXT,
ADD COLUMN     "tshirtSize" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
