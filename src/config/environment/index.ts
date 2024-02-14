import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const env = {
  development: process.env.NODE_ENV === 'DEV',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV == 'staging',
  production: process.env.NODE_ENV === 'production'
};

const postgresqlDBUri = <string>process.env.DATABASE_URL_POSTGRESQL;
const clerkSecretKey = <string>process.env.CLERK_SECRET_KEY;

const clerkWebhookSigningKey = <string>process.env.CLERK_WEBHOOK_SIGNING_KEY;

export { port, env, postgresqlDBUri, clerkSecretKey, clerkWebhookSigningKey };
