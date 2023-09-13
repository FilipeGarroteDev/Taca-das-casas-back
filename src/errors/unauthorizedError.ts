import { ErrorEntity } from '@/protocols';

const defaultMessage = 'O e-mail e/ou senha fornecidos são inválidos. Por favor, tente novamente.';

export default function unauthorizedError(message = defaultMessage): ErrorEntity {
  return {
    name: 'UnauthorizedError',
    message,
  };
}
