import { Express, Request, Response } from 'express';
import { env } from './config/environment';
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from './handlers/user';

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';

function routes(app: Express) {
  app.get('/user', ClerkExpressRequireAuth(), getUser);

  app.get('/user/:id', ClerkExpressRequireAuth(), getUserById);

  // clerk webhook routes, write middlware to deny access to anyone else
  app.post('/user', createUser);

  app.patch('/user', updateUser);

  app.delete('/user', deleteUser);

  // routes to check if the server is repsonding to requests.
  app.get('/servercheck', (req: Request, res: Response) => {
    if (!env.development) res.sendStatus(404);
    res.json({ status: 'SERVER OK' });
  });

  app.get(
    '/authcheck',
    ClerkExpressRequireAuth(),
    (req: Request, res: Response) => {
      if (!env.development) res.sendStatus(404);
      res.json({ status: 'AUTH OK' });
    }
  );

  app.get(
    '/dbcheck',
    ClerkExpressRequireAuth(),
    async (req: Request, res: Response) => {
      if (!env.development) res.sendStatus(404);
      const prisma = new PrismaClient();

      try {
        await prisma.$connect();
        res.json({ status: 'DB OK' });
      } catch (error) {
        console.error('Error connecting to the database: ' + error);
        res.json({ status: `DB Connection Error: ${error}` });
      } finally {
        await prisma.$disconnect();
      }
    }
  );
}

export default routes;
