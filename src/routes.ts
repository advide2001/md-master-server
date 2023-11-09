import { Express, Request, Response } from 'express';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // user info routes
  app.get('/user', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/user', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.patch('/user', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.delete('/user', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // route to get all documents
  app.get('/documents', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}

export default routes;
