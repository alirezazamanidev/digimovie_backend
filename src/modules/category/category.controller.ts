import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { CreateCategoryDto } from './dtos/create-category.dto';

@ApiTags(SwaggerTags.Category)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiOperation({summary:'create new category'})
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  create(@Body() categoryDto:CreateCategoryDto){
    return this.categoryService.create(categoryDto)

  }

  @ApiOperation({summary:'get all of categories for show in home site'})
  @HttpCode(HttpStatus.OK)
  @Get('get-all')
  findAll(){
    return this.categoryService.findAll();
  }

  @ApiOperation({summary:'delete one by id'})
  @HttpCode(HttpStatus.OK)
  @Delete('/remove/:id')
  remove(@Param('id',ParseIntPipe) id:number){
    return this.categoryService.remove(id)
  }
}
