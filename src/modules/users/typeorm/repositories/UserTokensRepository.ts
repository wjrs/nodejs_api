import { EntityRepository, Repository } from 'typeorm';
import UserToken from '@modules/users/typeorm/entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.findOne({ where: { token } });
  }

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.create({ user_id });

    return await this.save(userToken);
  }
}
