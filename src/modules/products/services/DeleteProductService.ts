import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
