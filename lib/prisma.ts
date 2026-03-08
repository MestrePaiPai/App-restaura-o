import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

let prismaInstance: PrismaClient | null = null;
let prismaInitError: Error | null = null;

try {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
} catch (error) {
  prismaInitError = error as Error;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (prismaInitError || !prismaInstance) {
      throw new Error(
        `Prisma não foi inicializado. Execute \"npm run prisma:generate\" e reinicie o servidor. ${
          prismaInitError?.message ?? ''
        }`
      );
    }
    return (prismaInstance as any)[prop];
  }
});

export function isPrismaReady() {
  return !prismaInitError && !!prismaInstance;
}
