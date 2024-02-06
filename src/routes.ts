import { Express, Request, Response } from 'express';
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from './handlers/user';

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

function routes(app: Express) {
  app.get('/user', ClerkExpressRequireAuth(), getUser);

  app.get('/user/:id', ClerkExpressRequireAuth(), getUserById);

  app.post('/user', createUser);

  app.patch('/user', updateUser);

  app.delete('/user', ClerkExpressRequireAuth(), deleteUser);

  // route to check if the server is repsonding to requests.
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}

export default routes;
