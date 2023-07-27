import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderModel } from "./model/order.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderInput } from "./dto/create-order.dto";
import { UpdateOrderInput } from "./dto/update-order.dto";
import { ProductService } from "src/product/product.service";
import { ProductModel } from "src/product/model/product.model";
import { UserModel } from "src/user/model/user.model";
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderRepository: Repository<OrderModel>,
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async getOrder(orderId: string): Promise<OrderModel> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    
    if (!order) {
      throw new NotFoundException(`order #${orderId} not found`);
    }
    return order;
  }

  async getOrders(): Promise<OrderModel[]> {
    const orders = await this.orderRepository.find();
    return orders;
  }
  async createOrder(orderInput: CreateOrderInput): Promise<OrderModel> {
    let totalPrice = 0;
    for (let i = 0; i < orderInput.products.length; i++) {
      const product = await this.productRepository.findOneBy({
        id: orderInput.products[i],
        availability:true
      });
      if (!product) {
        throw new NotFoundException(
          `Product #${orderInput.products[i]} not found`,
        );
      }
      totalPrice += product.price;
    }
    const checkOrder = await this.orderRepository.findOneBy({
      costumer:{id:orderInput.costumer}});
    if (checkOrder) {
      throw new Error(`order of this user already exists`);
    }
    const order = await this.orderRepository.save({
      costumer:{id:orderInput.costumer},
      totalPrice,
    });
    return order;
  }
  async updateOrder(
    orderId: string,
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderModel> {
    const order = await this.orderRepository.preload({
      id: orderId,
      costumer:{id:updateOrderInput.costumer},
    });
    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    return this.orderRepository.save(order);
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    const checkOrder = await this.orderRepository.findOneBy({
      id: orderId,
    });
    if (!checkOrder) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    await this.orderRepository.remove(checkOrder);
    return true;
  }
}
