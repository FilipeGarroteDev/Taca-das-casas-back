import activityRepository from '@/repositories/activity-repository';

async function listAllActivities() {
  const activitiesList = await activityRepository.getActivities();

  return activitiesList;
}

const activityService = {
  listAllActivities,
};

export default activityService;
