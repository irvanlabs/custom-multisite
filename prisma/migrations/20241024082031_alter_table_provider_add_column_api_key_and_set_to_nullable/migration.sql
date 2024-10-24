/*
  Warnings:

  - You are about to drop the column `apiKey` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "apiKey",
ADD COLUMN     "apiKey1" TEXT,
ADD COLUMN     "apiKey2" TEXT;
