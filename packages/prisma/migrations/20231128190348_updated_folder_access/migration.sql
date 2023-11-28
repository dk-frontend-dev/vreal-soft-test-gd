/*
  Warnings:

  - You are about to drop the column `userId` on the `FolderAccess` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `FolderAccess` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `FolderAccess` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FolderAccess" DROP CONSTRAINT "FolderAccess_userId_fkey";

-- AlterTable
ALTER TABLE "FolderAccess" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FolderAccess_userEmail_key" ON "FolderAccess"("userEmail");

-- AddForeignKey
ALTER TABLE "FolderAccess" ADD CONSTRAINT "FolderAccess_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
