import Product from '@modules/products/typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductsRepository);
    const products = await productRepository.find();

    return products;
  }
}

export default ListProductService;
