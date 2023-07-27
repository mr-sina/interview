import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class ProductModel {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column( {length: 500,  nullable: true })
  description: string;

  @Field()
  @Column("float")
  price: number;

  @Field()
  @Column("boolean")
  availability: boolean;

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
