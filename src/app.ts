import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import { loadEnvs } from '../config';
import { connectDb } from '../config/database';
import userRouter from './routers/user-router';
import activityRouter from './routers/activity-router';

loadEnvs();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/api/health', async (req: Request, res: Response) => res.send('OK'))
  .use(userRouter)
  .use(activityRouter);

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export default app;
