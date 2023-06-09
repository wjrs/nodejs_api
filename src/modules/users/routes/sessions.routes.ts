import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '@modules/users/Controllers/SessionController';

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.auth,
);

export default sessionRoutes;
