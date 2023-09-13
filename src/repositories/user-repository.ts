import { prismaPG } from '../../config';

async function searchUser(email: string) {
  return prismaPG.users.findFirst({
    where: {
      email,
    },
  });
}

async function createNewSession(userId: number, token: string) {
  return prismaPG.sessions.create({
    data: {
      userId,
      token,
    },
  });
}

async function updateUserPasswordAndStatus(email: string, password: string) {
  return prismaPG.users.update({
    where: {
      email
    },
    data: {
      password,
      isFirstAccess: false
    }
  });
}

const userRepository = {
  createNewSession,
  searchUser,
  updateUserPasswordAndStatus
};

export default userRepository;
