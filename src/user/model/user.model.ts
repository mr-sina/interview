import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { IsEmail } from 'class-validator';
import { OrderModel } from "src/order/model/order.model";

@ObjectType()
@Entity()
export class UserModel {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()  
  @IsEmail()
  @Column( {length: 40,  nullable: true })
  email: string;

  @Field()
  @Column("boolean")
  active: boolean;

  // @Field((type) => [InvoiceModel], { nullable: true })
  // @OneToMany((type) => InvoiceModel, (invoice) => invoice.customer)
  // invoices: InvoiceModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
