import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { UserModel } from "src/user/model/user.model";
import { UserService } from "src/user/user.service";
import { CreateOrderInput } from "./dto/create-order.dto";
import { UpdateOrderInput } from "./dto/update-order.dto";
import { OrderModel } from "./model/order.model";
import { OrderService } from "./order.service";

@Resolver(() => OrderModel)
export class OrderResolver {
  constructor(private orderService: OrderService,private userService: UserService) {}

  @Query(() => OrderModel)
  async getOrder(@Args({ name: "id", type: () => String }) id: string) {
    return this.orderService.getOrder(id);
  }

  @Query(() => [OrderModel])
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Mutation(() => OrderModel)
  async createOrder(@Args("input") order: CreateOrderInput) {
    return this.orderService.createOrder(order);
  }
  @Mutation(() => OrderModel)
  async updateOrder(@Args("input") order: UpdateOrderInput) {
    return this.orderService.updateOrder(order.id, order);
  }
  @Mutation(() => Boolean)
  async deleteOrder(@Args({ name: "id", type: () => String }) id: string) {
    return this.orderService.deleteOrder(id);
  }
  @ResolveField(returns => UserModel)
  async costumer(@Parent() order: OrderModel) {
    const { costumer } = order;
    return this.userService.getUser(costumer.id);
  }
}
