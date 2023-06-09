import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import User from '@modules/users/typeorm/entities/User';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const passwordChecked = await compare(password, user.password);

    if (!passwordChecked) {
      throw new AppError('Incorrect email or password.', 401);
    }

    return user;
  }
}
