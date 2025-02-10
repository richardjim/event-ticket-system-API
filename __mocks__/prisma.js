import { PrismaClient } from '@prisma/client';

const prismaMock = {
  event: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    deleteMany: jest.fn(),
  },
  booking: {
    deleteMany: jest.fn(),
  },
  waitingList: {
    deleteMany: jest.fn(),
  },
  $disconnect: jest.fn(),
};

export default prismaMock;
