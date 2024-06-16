import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entities/user.entity'

export class CreateTransactionDto {
	@ApiProperty({
		example: 'Bitcoin',
		description: 'Название транзакции',
	})
	@IsNotEmpty()
	title: string

	@ApiProperty({
		example: 1000,
		description: 'Сумма транзакции',
	})
	@IsNotEmpty()
	@IsNumber()
	amount: number

	@ApiProperty({
		example: 'expense',
		description: 'Тип транзакции (расход/доход)',
	})
	@IsNotEmpty()
	@IsString()
	type: 'expense' | 'income'

	@ApiProperty({
		example: 1,
		description: 'Категория транзакции',
	})
	@IsNotEmpty()
	category: Category

	@ApiProperty({
		example: { id: 1 },
		description: 'Пользователь, создавший транзакцию',
	})
	@IsNotEmpty()
	user: User
}
