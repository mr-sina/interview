import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CreateProductInput } from "./dto/create-product.dto";
import { UpdateProductInput } from "./dto/update-product.dto";
import { ProductModel } from "./model/product.model";
import { ProductService } from "./product.service";

@Resolver(() => ProductModel)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => ProductModel)
  async getProduct(@Args({ name: "id", type: () => String }) id: string) {
    return this.productService.getProduct(id);
  }

  @Query(() => [ProductModel])
  async getProducts() {
    return this.productService.getProducts();
  }

  @Mutation(() => ProductModel)
  async createProduct(@Args("input") product: CreateProductInput) {
    return this.productService.createProduct(product);
  }
  @Mutation(() => ProductModel)
  async updateProduct(@Args("input") product: UpdateProductInput) {
    return this.productService.updateProduct(product.id, product);
  }
}
