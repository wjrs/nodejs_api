import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = await productRepository.findOne(id);
    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productExists = await productRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name.', 422);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);
    await redisCache.invalidate('product-list');

    return product;
  }
}

export default UpdateProductService;
