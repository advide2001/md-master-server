import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

const app = express();

app.use(morgan('common'));
app.use(helmet());
// Allows request from any origin.
// For production, this should be configured to allow request from only white listed IPs
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
});
// This applies to api, to apply to a specific api use app.use("/api", limiter);
app.use(limiter);

export default app;
