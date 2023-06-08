import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    message: 'Hello Dev! 👨🏻‍💻',
  });
});

routes.use('/products', productsRoutes);

export default routes;
