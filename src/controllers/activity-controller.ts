import activityService from '@/services/activity-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function listAllActivities(_req: Request, res: Response) {
  try {
    const activitiesList = await activityService.listAllActivities();
    res.status(httpStatus.OK).send(activitiesList);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
