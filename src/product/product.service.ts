import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductModel } from "./model/product.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductInput } from "./dto/create-product.dto";
import { UpdateProductInput } from "./dto/update-product.dto";
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async getProduct(productId: string): Promise<ProductModel> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`product #${productId} not found`);
    }
    return product;
  }

  async getProducts(): Promise<ProductModel[]> {
    const products = await this.productRepository.find();
    return products;
  }
  async createProduct(productInput: CreateProductInput): Promise<ProductModel> {
    const checkProduct = await this.productRepository.findOneBy({
      name: productInput.name,
    });
    if (checkProduct) {
      throw new Error(`product with this name already exist`);
    }
    const product = await this.productRepository.save(productInput);
    return product;
  }
  async updateProduct(
    productId: string,
    updateProductInput: UpdateProductInput,
  ): Promise<ProductModel> {
    const user = await this.productRepository.preload({
      id: productId,
      ...updateProductInput,
    });
    if (!user) {
      throw new NotFoundException(`product #${productId} not found`);
    }
    return this.productRepository.save(user);
  }
}
