import Product from '@modules/products/typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductsRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.recovery<Product[]>('product-list');
    if (!products) {
      products = await productRepository.find();

      await redisCache.save('product-list', products);
    }

    return products;
  }
}

export default ListProductService;
