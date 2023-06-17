import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UserTokensRepository } from '@modules/users/typeorm/repositories/UserTokensRepository';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

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
    const forgotPassTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'API Backend - Recuperação de Senha',
      templateData: {
        file: forgotPassTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token.token}`,
        },
      },
    });
  }
}
