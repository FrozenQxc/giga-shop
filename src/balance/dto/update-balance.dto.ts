import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class UpdateBalanceDto {
	@ApiProperty({ example: 100, description: 'Сумма для пополнения баланса' })
	@IsNumber()
	amount: number
}
