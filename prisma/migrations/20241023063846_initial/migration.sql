-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('CNAME', 'TXT', 'MX');

-- CreateEnum
CREATE TYPE "SiteStatus" AS ENUM ('PENDING', 'FAILED', 'VERIFIED', 'ACTIVE');

-- CreateEnum
CREATE TYPE "DomainStatus" AS ENUM ('PENDING', 'FAILED', 'VERIFIED', 'ACTIVE');

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "tld" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "status" "DomainStatus" NOT NULL DEFAULT 'PENDING',
    "verifiedAt" TIMESTAMP(3),
    "providerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteDns" (
    "id" SERIAL NOT NULL,
    "nameserver1" TEXT NOT NULL,
    "nameserver2" TEXT NOT NULL,
    "nameserver3" TEXT NOT NULL,
    "nameserver4" TEXT NOT NULL,
    "cloudflareZoneId" TEXT,
    "digitalOceanId" TEXT,
    "formerNameserver1" TEXT NOT NULL,
    "formerNameserver2" TEXT NOT NULL,
    "formerNameserver3" TEXT NOT NULL,
    "formerNameserver4" TEXT NOT NULL,
    "siteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteDns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteVerification" (
    "id" SERIAL NOT NULL,
    "type" "VerificationType" NOT NULL,
    "value" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "lastAttemptAt" TIMESTAMP(3),
    "siteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookLog" (
    "id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteDns" ADD CONSTRAINT "SiteDns_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteVerification" ADD CONSTRAINT "SiteVerification_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
