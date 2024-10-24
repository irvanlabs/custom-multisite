-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "isActive" SET DEFAULT false,
ALTER COLUMN "isVerified" SET DEFAULT false;

-- AlterTable
ALTER TABLE "SiteVerification" ADD COLUMN     "alias" TEXT;
