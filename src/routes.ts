import { Express, Request, Response } from 'express';
import { MarkdownContentWithId } from './types/database';
import { markdownContent } from './utils/db';

function routes(app: Express) {
  // temp route to check mongo db connection
  app.get(
    '/documents',
    async (req: Request, res: Response<MarkdownContentWithId[]>) => {
      const results = markdownContent.find();
      const markdownDocuments = await results.toArray();
      res.json(markdownDocuments);
    }
  );

  // temp route to check postgres db connection
  app.get('/user', async (req: Request, res: Response) => {
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

  // route to check if the server is repsonding to requests
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}

export default routes;
