import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repository/products.repository';
import { CategoryRepository } from '../categories/repository/categoris.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository,CategoryRepository])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
