import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModel } from "src/product/model/product.model";
import { ProductsModule } from "src/product/product.module";
import { ProductService } from "src/product/product.service";
import { UsersModule } from "src/user/user.module";
import { OrderModel } from "./model/order.model";
import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";
@Module({
  imports: [TypeOrmModule.forFeature([OrderModel]),ProductsModule,UsersModule],
  providers: [OrderResolver, OrderService],
})
export class OrdersModule {}
