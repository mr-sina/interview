import { InputType, Int, Field } from '@nestjs/graphql';
import { UserIdInput } from 'src/user/dto/update-user.dto';
import { UserModel } from 'src/user/model/user.model';
import { PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateOrderInput {

  @Field(() => String, { description: 'costumer id of the order' })
  @PrimaryGeneratedColumn("uuid")
  costumer: string;
  @Field(() => [String], { description: 'prouducts ids of the order' })
  products: string[];
}