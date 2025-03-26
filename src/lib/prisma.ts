import { PrismaClient } from '@prisma/client';

// Use PrismaClient with global to prevent multiple instances during hot reloading in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a client with error handling to support demo mode when database is not available
export const prisma = globalForPrisma.prisma || new PrismaClient({
  // Log queries in development
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// If we're not in production, attach to the global object
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Helper function to check if the database is available
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    await prisma.$connect();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
} 