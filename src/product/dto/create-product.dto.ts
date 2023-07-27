import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {

  @Field(() => String, { description: 'name of the product' })
  name: string;
  @Field(() => String, { description: 'description of the product' })
  description: string;
  @Field(() => Number, { description: 'price of the product' })
  price: number;
  @Field(() => Boolean, { description: 'availability of the product' })
  availability: boolean;
}