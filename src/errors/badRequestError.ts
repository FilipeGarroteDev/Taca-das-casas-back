import { ErrorEntity } from '@/protocols';

export default function badRequestError(message: string): ErrorEntity {
  return {
    name: 'BadRequestError',
    message,
  };
}
