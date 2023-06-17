import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/routes/users.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes';
import passwordsRoutes from '@modules/users/routes/passwords.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    message: 'Hello Dev! 👨🏻‍💻',
  });
});

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordsRoutes);

export default routes;
