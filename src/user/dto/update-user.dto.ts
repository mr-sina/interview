
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;
}

@InputType()
export class UserIdInput {
  @Field(() => String)
  @IsNotEmpty()
  id: string;
}