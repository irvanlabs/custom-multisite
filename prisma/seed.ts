import { PrismaClient } from '@prisma/client';
import { ProviderSeeds } from './seeds/provider';

const prisma = new PrismaClient();

async function main() {
 ProviderSeeds()
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
