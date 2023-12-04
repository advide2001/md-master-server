import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { mongoDBUri } from '../../config/environment';
import { MarkdownContent } from '../../types/database';

export const mongoClient = new MongoClient(mongoDBUri);
export const mongoDBInstance = mongoClient.db();

export const markdownContent =
  mongoDBInstance.collection<MarkdownContent>('markdown-content');

export const primaryDatabase = new PrismaClient();
