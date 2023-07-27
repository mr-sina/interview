import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './model/product.model';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
@Module({
    imports:[TypeOrmModule.forFeature([ProductModel])],
  providers: [ProductResolver,ProductService],
  exports:[ProductService,TypeOrmModule]
})
export class ProductsModule {}