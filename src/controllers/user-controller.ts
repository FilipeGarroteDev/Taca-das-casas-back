import { SignInBody, UpdatePasswordBody } from '@/protocols';
import userService from '@/services/user-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function signIn(req: Request, res: Response) {
  const signInData: SignInBody = req.body;

  try {
    const clientAccountData = await userService.validateCredentialAndSignIn(signInData);
    res.status(httpStatus.OK).send(clientAccountData);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      res.status(httpStatus.UNAUTHORIZED).send(error.message);
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function updateFirstLoginPassword(req: Request, res: Response) {
  const updatePasswordData: UpdatePasswordBody = req.body;

  try {
    await userService.validatePasswordAndUpdate(updatePasswordData);
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      res.status(httpStatus.UNAUTHORIZED).send(error.message);
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

// export async function validateTokenAndGetUserData(req: Request, res: Response) {
//   const userId: number = res.locals.userId;

//   try {
//     const users: Users = await authService.getUserData(userId);
//     return res.status(httpStatus.OK).send({ name: users.name, role: users.role });
//   } catch (error) {
//     return res.sendStatus(httpStatus.UNAUTHORIZED);
//   }
// }

// export async function adminSignIn(req: Request, res: Response) {
//   const signInData: AdminCredentials = req.body;

//   try {
//     const adminData = await authService.handleAdminLogin(signInData);
//     res.status(httpStatus.OK).send(adminData);
//   } catch (error) {
//     if (error.name === 'UnauthorizedError') {
//       res.sendStatus(httpStatus.UNAUTHORIZED);
//     } else if (error.name === 'ForbiddenError') {
//       res.sendStatus(httpStatus.FORBIDDEN);
//     } else {
//       res.sendStatus(httpStatus.BAD_REQUEST);
//     }
//   }
// }
