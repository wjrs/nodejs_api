import { EntityRepository, Repository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    return await this.findOne({ where: { name } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.findOne({ where: { id } });
  }
}
