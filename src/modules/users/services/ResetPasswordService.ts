import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { UserTokensRepository } from '@modules/users/typeorm/repositories/UserTokensRepository';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.', 422);
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.', 422);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 422);
    }

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}
