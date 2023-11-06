import mongoose from 'mongoose';
import { mongoDBUri } from '../../config/environment';

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoDBUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Failed to connect to Mongo DB');
    process.exit(1);
  }
}

export { connectToMongoDB };
