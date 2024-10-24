-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "SiteVerification" ADD COLUMN     "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING';
