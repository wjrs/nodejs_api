import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import User from '@modules/users/typeorm/entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already one user with this email.', 422);
    }

    const user = usersRepository.create({
      name,
      email,
      password: await hash(password, 8),
    });

    await usersRepository.save(user);

    return user;
  }
}
