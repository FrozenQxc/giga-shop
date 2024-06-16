import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateCategoryDto } from './create-category.dto'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
	@ApiProperty({
		example: 'Groceries',
		description: 'Название категории',
		required: false,
	})
	title?: string
}
