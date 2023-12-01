import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV == 'staging',
  production: process.env.NODE_ENV === 'production'
};

const mongoDBUri = <string>process.env.DATABASE_URL_MONGODB;
const postgresqlDBUri = <string>process.env.DATABASE_URL_POSTGRESQL;

export { port, env, mongoDBUri, postgresqlDBUri };
