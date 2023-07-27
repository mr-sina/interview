import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.dto";
import { UpdateUserInput } from "./dto/update-user.dto";
import { UserModel } from "./model/user.model";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async getUser(userId: string): Promise<UserModel> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`user #${userId} not found`);
    }
    return user;
  }

  async getUsers(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    return users;
  }
  async createUser(userInput: CreateUserInput): Promise<UserModel> {
    const checkUser = await this.userRepository.findOneBy({
      email: userInput.email,
    });
    if (checkUser) {
      throw new Error(`user with this email already exist`);
    }
    const user = await this.userRepository.save(userInput);
    return user;
  }
  async updateUser(
    userId: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserModel> {
    const user = await this.userRepository.preload({
      id: userId,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.save(user);
  }
}
