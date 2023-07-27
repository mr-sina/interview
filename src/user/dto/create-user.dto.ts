import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {

  @Field(() => String, { description: 'name of the user' })
  name: string;
  
  @IsEmail()
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Field(() => Boolean, { description: 'is user active ?' })
  active: boolean;
}