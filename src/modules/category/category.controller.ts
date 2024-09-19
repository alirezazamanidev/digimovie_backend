import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/common/enums';
import { CreateCategoryDto } from './dtos/create-category.dto';

@ApiTags(SwaggerTags.Category)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiOperation({summary:'create new category'})
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() categoryDto:CreateCategoryDto){
    return this.categoryService.create(categoryDto)

  }

}
