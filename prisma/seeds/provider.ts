import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ProviderSeeds() {
  // Buat provider Cloudflare
  const cloudflare = await prisma.provider.create({
    data: {
      name: 'Cloudflare',
      apiKey1: null,
      apiKey2: null,
    },
  });

  // Buat provider DigitalOcean
  const digitalOcean = await prisma.provider.create({
    data: {
      name: 'Digitalocean',
      apiKey1: null,
      apiKey2: null,
    },
  });

  console.log('Providers seeded:', { cloudflare, digitalOcean });
}