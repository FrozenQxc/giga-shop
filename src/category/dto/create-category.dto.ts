import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateCategoryDto {
	@ApiProperty({ example: 'Groceries', description: 'Название категории' })
	@IsNotEmpty()
	title: string

	@ApiProperty({
		type: () => User,
		description: 'Пользователь',
		required: false,
	})
	@IsOptional()
	user?: User
}
