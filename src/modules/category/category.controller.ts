import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiPaginationQuery } from 'src/common/decorators';
import { paginaionQueryDto } from 'src/common/dtos';
import { UpdateCategoryDto } from './dtos/update-category.dto';

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
  @ApiOperation({summary:'list of categories with pagination!'})
  @HttpCode(HttpStatus.OK)
  @ApiPaginationQuery()
  @Get('list')
  listOfCategories(@Query() paginationdTo:paginaionQueryDto){
    return this.categoryService.listOfCategories(paginationdTo)

  }

  @ApiOperation({summary:'delete one by id'})
  @HttpCode(HttpStatus.OK)
  @Delete('/remove/:id')
  remove(@Param('id',ParseIntPipe) id:number){
    return this.categoryService.remove(id)
  }
  @ApiOperation({summary:'update category by id'})
  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  update(@Param('id',ParseIntPipe) id:number,@Body() categoryDto:UpdateCategoryDto){
    return this.categoryService.update(id,categoryDto)

  }
}
