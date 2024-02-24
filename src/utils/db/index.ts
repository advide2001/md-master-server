import { PrismaClient, Prisma } from '@prisma/client';

export const primaryDatabase = new PrismaClient();
export type UserCreateInput = Prisma.UserCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
