import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = await productRepository.findOne(id);
    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    await productRepository.remove(product);
    await redisCache.invalidate('product-list');
  }
}

export default DeleteProductService;
