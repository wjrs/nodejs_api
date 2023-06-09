import { Request, Response } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new CreateSessionService();

    const userAuth = await createSession.execute({
      email,
      password,
    });

    return response.json(userAuth);
  }
}
