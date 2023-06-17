import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(name);
    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('There is already one product with this name.', 422);
    }

    const product = productsRepository.create({ name, price, quantity });

    await productsRepository.save(product);
    await redisCache.invalidate('product-list');

    return product;
  }
}

export default CreateProductService;
