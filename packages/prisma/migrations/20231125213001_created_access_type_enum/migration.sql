-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "type" "AccessType" NOT NULL DEFAULT 'PUBLIC';
