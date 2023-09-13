import express from 'express';
import validateSchema from '@/middlewares/schemas-middleware';
import { SignInSchema, UpdatePasswordSchema } from '@/schemas/user-schemas';
import {  signIn, updateFirstLoginPassword } from '@/controllers/user-controller';

const userRouter = express.Router();

userRouter
  .post('/signin', validateSchema(SignInSchema), signIn)
  .post('/first-access/updatePassword', validateSchema(UpdatePasswordSchema), updateFirstLoginPassword);

export default userRouter;
