import { port } from './config/environment';
import app from './app';
import { serverStartMessage, serverFailMessage } from './constants';
import { connectToMongoDB } from './utils/db';
import log from './utils/logger';
import routes from './routes';

const start = async () => {
  try {
    app.listen(port, async () => {
      await connectToMongoDB();
      routes(app);
    });
    log.info(serverStartMessage + port);
  } catch {
    log.info(serverFailMessage);
  }
};

start();
