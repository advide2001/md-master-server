import { port } from './config/environment';
import app from './app';

const start = async () => {
  try {
    app.listen(port);
    console.log(`server running on port ${port}...`);
  } catch {
    console.log('server not failed to start!');
  }
};

start();
