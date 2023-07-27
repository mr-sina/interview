import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CreateUserInput } from "./dto/create-user.dto";
import { UpdateUserInput } from "./dto/update-user.dto";
import { UserModel } from "./model/user.model";
import { UserService } from "./user.service";

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserModel)
  async getUser(@Args({ name: "id", type: () => String }) id: string) {
    return this.userService.getUser(id);
  }

  @Query(() => [UserModel])
  async getUsers() {
    return this.userService.getUsers();
  }

  @Mutation(() => UserModel)
  async createUser(@Args("input") user: CreateUserInput) {
    return this.userService.createUser(user);
  }
  @Mutation(() => UserModel)
  async updateUser(@Args("input") user: UpdateUserInput) {
    return this.userService.updateUser(user.id, user);
  }
}
