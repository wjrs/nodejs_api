import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UserTokensRepository } from '@modules/users/typeorm/repositories/UserTokensRepository';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('There is no user with this email.', 422);
    }

    const token = await userTokensRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha: ${token?.token}`,
    });
  }
}
