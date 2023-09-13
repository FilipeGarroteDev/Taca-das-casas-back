
export type ErrorEntity = {
  name: string;
  message: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type UpdatePasswordBody = {
  email: string;
  oldPassword: string;
  newPassword: string;
};
