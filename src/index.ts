import { port } from './config/environment';
import app from './app';
import routes from './routes';

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
