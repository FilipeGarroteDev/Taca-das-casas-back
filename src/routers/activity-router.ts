import express from 'express';
import { listAllActivities } from '@/controllers/activity-controller';

const activityRouter = express.Router();

activityRouter
  .get('/activities', listAllActivities);

export default activityRouter;
