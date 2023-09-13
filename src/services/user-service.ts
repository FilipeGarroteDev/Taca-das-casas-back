import badRequestError from '@/errors/badRequestError';
import unauthorizedError from '@/errors/unauthorizedError';
import { SignInBody, UpdatePasswordBody } from '@/protocols';
import userRepository from '@/repositories/user-repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await userRepository.createNewSession(userId, token);

  return token;
}

async function validateCredentialAndSignIn(signInData: SignInBody) {
  const { email, password } = signInData;
  const existentUser = await userRepository.searchUser(email);

  if (!existentUser) {
    throw unauthorizedError();
  }

  const validatePassword = await bcrypt.compare(password, existentUser.password);

  if (!validatePassword) {
    throw unauthorizedError();
  }

  const token = await createSession(existentUser.id);

  const clientAccountData = {
    user: existentUser,
    token,
  };

  return clientAccountData;
}

async function validatePasswordAndUpdate(body: UpdatePasswordBody): Promise<void> {
  const { email, oldPassword, newPassword } = body;

  if(oldPassword === newPassword) throw badRequestError('Você deve escolher uma senha diferente da antiga. Refaça a operação');

  const existentUser = await userRepository.searchUser(email);

  if (!existentUser) {
    throw unauthorizedError();
  }

  const validatePassword = await bcrypt.compare(oldPassword, existentUser.password);

  if (!validatePassword) {
    throw unauthorizedError();
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userRepository.updateUserPasswordAndStatus(email, hashedPassword);
}

// async function getUserData(userId: number): Promise<Users> {
//   const user = await usersRepository.getUserById(userId);

//   return user;
// }

// async function handleAdminLogin(signInData: AdminCredentials) {
//   if (signInData.restaurantSecretKey !== process.env.RESTAURANT_SECRET_KEY) throw forbiddenError();

//   const existentUser = await usersRepository.searchAdminByEmail(signInData.email);

//   if (!existentUser) {
//     throw unauthorizedError();
//   }

//   const token = await createSession(existentUser.id);

//   const adminAccountData = {
//     user: {
//       id: existentUser.id,
//       name: signInData.name,
//       image: signInData.image,
//       role: existentUser.role,
//     },
//     token,
//   };

//   return adminAccountData;
// }

const userService = {
  validateCredentialAndSignIn,
  validatePasswordAndUpdate
};

export default userService;
