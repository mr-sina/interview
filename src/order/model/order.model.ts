import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { UserModel } from "src/user/model/user.model";
import { ProductModel } from "src/product/model/product.model";

@ObjectType()
@Entity()
export class OrderModel {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("float")
  totalPrice: number;

  
  @Field((type) => UserModel, { nullable: true })
  @OneToOne((type) => UserModel, (user:UserModel) => user.id)
  @JoinTable()
  @JoinColumn()
  costumer: UserModel;

  // @Field((type) => [ProductModel], { nullable: true })
  // @OneToOne((type) => ProductModel, (product:ProductModel) => product.id)
  // @JoinColumn()
  // products: ProductModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
