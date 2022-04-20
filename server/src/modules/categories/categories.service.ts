import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repository/categoris.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = this.categoryRepository.create({
        ...createCategoryDto,
      });
      return await newCategory.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const found = await this.categoryRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Category with this id ${id} Not found`);
      }
      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const found = await this.categoryRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Category with this id ${id} Not found`);
      }
      await this.categoryRepository.update({ id }, { ...updateCategoryDto });
      return await this.categoryRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<number> {
    try {
      const found = await this.categoryRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Category with this id ${id} Not found`);
      }
      await this.categoryRepository.delete(id);
      return id;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
