
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateOrderInput } from './create-order.dto';

@InputType()
export class UpdateOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: 'costumer id of the order' })
  costumer: string;
}