/*
  Warnings:

  - Changed the type of `userId` on the `Site` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;
