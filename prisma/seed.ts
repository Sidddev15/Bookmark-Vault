import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.link.deleteMany();

  await prisma.link.createMany({
    data: [
      { url: 'https://example.com', title: 'Example', tags: ['test'], readLater: false },
      { url: 'https://nodejs.org', title: 'Node.js', tags: ['node','docs'], readLater: true },
    ],
  });
}
main()
  .then(() => console.log('Seeded'))
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
