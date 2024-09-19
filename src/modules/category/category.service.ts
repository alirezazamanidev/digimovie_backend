import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import {
  ConflictMessage,
  NotFoundMessage,
  PublicMessage,
} from 'src/common/enums';
import slugify from 'slugify';
import { paginaionQueryDto } from 'src/common/dtos';
import { paginationGenerator, paginationSolver } from 'src/common/utils';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(categoryDto: CreateCategoryDto) {
    let { title, description, slug } = categoryDto;
    let categoryObj: DeepPartial<CategoryEntity> = { title, description };

    if (slug) {
      categoryObj['slug'] = await this.checkExistBySlug(slug);
    } else {
      categoryObj['slug'] = slugify(title, {
        replacement: '_',
        lower: true,
        trim: true,
      });
    }
    await this.categoryRepository.save(categoryObj);
    return {
      message: PublicMessage.Created,
    };
  }

  async checkExistBySlug(slug: string) {
    const cate = await this.categoryRepository.findOneBy({ slug });
    if (cate) throw new ConflictException(ConflictMessage.Slug);
    return slug;
  }
  async findAll() {
    const categories = await this.categoryRepository.find({
      order: { id: 'DESC' },
    });
    return {
      categories,
    };
  }
  async remove(id: number) {
    const category = await this.findOneById(id);
    await this.categoryRepository.remove(category);
    return {
      message: PublicMessage.Deleted,
    };
  }
  async findOneById(id: number) {
    const cate = await this.categoryRepository.findOneBy({ id });
    if (!cate) throw new NotFoundException(NotFoundMessage.Category);
    return cate;
  }
  async listOfCategories(paginationDto:paginaionQueryDto){
    let {page,limit,skip}=paginationSolver(paginationDto);
    
    const [categories,count]=await this.categoryRepository.findAndCount({
        where:{},
        skip,
        take:limit,
        order:{id:'DESC'}
    });
    return {
        pagtination:paginationGenerator(count,page,limit),
        categories
    }
  }
}
