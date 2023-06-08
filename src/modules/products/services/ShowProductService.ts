import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import Product from '@modules/products/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    return product;
  }
}

export default ShowProductService;
