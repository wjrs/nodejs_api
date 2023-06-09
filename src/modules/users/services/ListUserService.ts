import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepository);
    return await userRepository.find();
  }
}
