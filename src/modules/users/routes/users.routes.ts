import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '@modules/users/Controllers/UsersController';
import isAuthenticated from '@shared/middlewares/isAuthenticated';

const usersRoutes = Router();
const usersController = new UsersController();

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

export default usersRoutes;
