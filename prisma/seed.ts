import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
  await prisma.settings.upsert({ where: { id: 'singleton' }, update: {}, create: { id: 'singleton', restaurantName: 'Restaurante Demo', mbwayNumber: '9XXXXXXXX' } });

  await prisma.user.upsert({
    where: { email: 'admin@rest.local' },
    update: {},
    create: { name: 'Admin', email: 'admin@rest.local', passwordHash: await bcrypt.hash('Admin123!', 10), role: 'ADMIN', active: true }
  });

  await prisma.user.upsert({
    where: { email: 'staff@rest.local' },
    update: {},
    create: { name: 'Staff', email: 'staff@rest.local', passwordHash: await bcrypt.hash('Staff123!', 10), role: 'STAFF', active: true }
  });

  for (let i = 1; i <= 5; i++) {
    await prisma.table.upsert({ where: { number: String(i) }, update: {}, create: { number: String(i), token: nanoid(32), status: 'OPEN' } });
  }

  const entradas = await prisma.menuCategory.upsert({ where: { id: 'cat-ent' }, update: {}, create: { id: 'cat-ent', name: 'Entradas', sortOrder: 1 } });
  const pratos = await prisma.menuCategory.upsert({ where: { id: 'cat-pra' }, update: {}, create: { id: 'cat-pra', name: 'Pratos', sortOrder: 2 } });
  const bebidas = await prisma.menuCategory.upsert({ where: { id: 'cat-beb' }, update: {}, create: { id: 'cat-beb', name: 'Bebidas', sortOrder: 3 } });

  const items = [
    [entradas.id, 'Pão e Azeitonas', 250, 6],
    [pratos.id, 'Bacalhau à Brás', 1350, 13],
    [pratos.id, 'Bitoque', 1100, 13],
    [bebidas.id, 'Água 0.5L', 150, 23],
    [bebidas.id, 'Sumo Natural', 320, 23]
  ] as const;

  for (const [categoryId, name, priceCents, vatRate] of items) {
    await prisma.menuItem.upsert({
      where: { id: `${categoryId}-${name}`.replace(/\s+/g, '-') },
      update: {},
      create: { id: `${categoryId}-${name}`.replace(/\s+/g, '-'), categoryId, name, description: name, priceCents, vatRate, active: true }
    });
  }
}

main().finally(() => prisma.$disconnect());
