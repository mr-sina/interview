import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsModule } from './product/product.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductResolver } from './product/product.resolver';
import { join } from 'path';
import { UserModel } from './user/model/user.model';
import { OrdersModule } from './order/order.module';
import { UsersModule } from './user/user.module';
@Module({
  imports: [
    ProductsModule,
    UsersModule,
    OrdersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'interview',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
