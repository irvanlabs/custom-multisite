/*
  Warnings:

  - Added the required column `userId` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "userId" TEXT NOT NULL;
