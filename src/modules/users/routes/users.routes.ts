import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import uploadConfig from '@config/upload';
import UsersController from '@modules/users/Controllers/UsersController';
import isAuthenticated from '@shared/middlewares/isAuthenticated';
import UserAvatarController from '@modules/users/Controllers/UserAvatarController';
import multer from 'multer';

const usersRoutes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRoutes.get('/', isAuthenticated, usersController.index);

usersRoutes.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRoutes.patch('/avatar', isAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRoutes;
