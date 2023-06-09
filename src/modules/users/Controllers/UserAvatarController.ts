import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userAvatarService = new UpdateUserAvatarService();

    const user = userAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file!.filename,
    });

    return response.json(user);
  }
}
