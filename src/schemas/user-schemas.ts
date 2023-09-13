import joi from 'joi';

const SignInSchema = joi.object({
  password: joi.string().required(),
  email: joi.string().email().required(),
});

const UpdatePasswordSchema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
  email: joi.string().email().required(),
});

export { UpdatePasswordSchema, SignInSchema };
