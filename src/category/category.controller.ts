import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Создать новую категорию' })
	@ApiBody({ type: CreateCategoryDto })
	@ApiResponse({
		status: 201,
		description: 'Категория успешно создана',
		type: Category,
	})
	@ApiResponse({
		status: 409,
		description: 'Категория с таким названием уже существует',
	})
	@ApiResponse({
		status: 500,
		description: 'Произошла ошибка при создании категории',
	})
	create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
		return this.categoryService.create(createCategoryDto, +req.user.id)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Получить все категории' })
	@ApiResponse({
		status: 200,
		description: 'Список категорий',
		type: [Category],
	})
	async findAll(@Req() req) {
		return this.categoryService.findAll(+req.user.id)
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Получить категорию по ID' })
	@ApiParam({ name: 'id', description: 'ID категории' })
	@ApiResponse({
		status: 200,
		description: 'Информация о категории',
		type: Category,
	})
	@ApiResponse({ status: 404, description: 'Категория не найдена' })
	findOne(@Param('id') id: string) {
		return this.categoryService.findOne(+id)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Обновить категорию' })
	@ApiParam({ name: 'id', description: 'ID категории' })
	@ApiBody({ type: UpdateCategoryDto })
	@ApiResponse({
		status: 200,
		description: 'Категория успешно обновлена',
		type: Category,
	})
	@ApiResponse({ status: 404, description: 'Категория не найдена' })
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoryService.update(+id, updateCategoryDto)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Удалить категорию' })
	@ApiParam({ name: 'id', description: 'ID категории' })
	@ApiResponse({ status: 200, description: 'Категория успешно удалена' })
	@ApiResponse({ status: 404, description: 'Категория не найдена' })
	remove(@Param('id') id: string) {
		return this.categoryService.remove(+id)
	}
}
