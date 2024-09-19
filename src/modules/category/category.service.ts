import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ConflictMessage, PublicMessage } from 'src/common/enums';
import slugify from 'slugify';

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
}
