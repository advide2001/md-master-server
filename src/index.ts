import { port } from './config/environment';
import app from './app';
import routes from './routes';
import { StrictAuthProp } from '@clerk/clerk-sdk-node';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const start = async () => {
  try {
    app.listen(port, async () => {
      routes(app);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
