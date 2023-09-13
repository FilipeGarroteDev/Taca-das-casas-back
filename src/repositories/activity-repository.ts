import { prismaPG } from '../../config';

async function getActivities() {
  return prismaPG.activities.findMany();
}

const activityRepository = {
  getActivities,
};

export default activityRepository;
