import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
	) {}

	async create(createCategoryDto: CreateCategoryDto, id: number) {
		const isExist = await this.categoryRepository.findBy({
			title: createCategoryDto.title,
			user: { id },
		})

		if (isExist.length)
			throw new BadRequestException(
				'Категория с таким названием уже существует',
			)

		const newCategory = {
			title: createCategoryDto.title,
			user: { id },
		}

		return await this.categoryRepository.save(newCategory)
	}

	async findAll(userId: number) {
		return await this.categoryRepository.find({
			where: {
				user: { id: userId },
			},
			// relations: ['transaction'],
		})
	}

	async findOne(id: number) {
		const category = await this.categoryRepository.findOne({
			where: { id },
			relations: ['user'],
		})

		if (!category) throw new NotFoundException('Категория не найдена')

		return category
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const category = await this.categoryRepository.findOne({
			where: { id },
		})

		if (!category) throw new NotFoundException('Категория не найдена')

		await this.categoryRepository.update(id, updateCategoryDto)
		return await this.categoryRepository.findOne({ where: { id } })
	}

	async remove(id: number) {
		const result = await this.categoryRepository.delete(id)
		if (result.affected === 0) {
			throw new NotFoundException('Категория не найдена')
		}
		return `Категория с id ${id} успешно удалена`
	}
}
