import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../categories/repository/categoris.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { categoryId, ...rest } = createProductDto;
      const category = await this.categoryRepository.findOne(categoryId);
      if (!category) {
        throw new NotFoundException(
          `Category with this id ${categoryId} Not found`,
        );
      }
      const newProduct = this.productRepository.create({
        category,
        ...rest,
      });
      return await newProduct.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const found = await this.productRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Product with this id ${id} Not found`);
      }
      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const { categoryId, ...rest } = updateProductDto;
      const category = await this.categoryRepository.findOne(categoryId);
      if (!category) {
        throw new NotFoundException(
          `Category with this id ${categoryId} Not found`,
        );
      }
      const found = await this.productRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Product with this id ${id} Not found`);
      }
      await this.productRepository.update({ id }, { ...rest });
      return await this.productRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<number> {
    try {
      const found = await this.productRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Product with this id ${id} Not found`);
      }
      await this.productRepository.delete(id);
      return id;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
