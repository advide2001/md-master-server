import { Express, Request, Response } from 'express';
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from './handlers/user';

function routes(app: Express) {
  app.get('/user', getUser);

  app.get('/user/:id', getUserById);

  app.post('/user', createUser);

  app.patch('/user', updateUser);

  app.delete('/user', deleteUser);

  // route to check if the server is repsonding to requests.
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}

export default routes;
