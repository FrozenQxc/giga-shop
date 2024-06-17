import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BalanceService } from './balance.service'
import { UpdateBalanceDto } from './dto/update-balance.dto'
import { Balance } from './entities/balance.entity'

@ApiTags('balance')
@Controller('balance')
export class BalanceController {
	constructor(private readonly balanceService: BalanceService) {}

	@Get(':userId')
	@ApiOperation({ summary: 'Получить баланс пользователя' })
	@ApiResponse({
		status: 200,
		description: 'Баланс успешно получен',
		type: Balance,
	})
	@ApiResponse({ status: 404, description: 'Баланс не найден' })
	getBalance(@Param('userId') userId: number): Promise<Balance> {
		return this.balanceService.getBalance(userId)
	}

	@Post('update/:userId')
	@ApiOperation({ summary: 'Пополнить баланс пользователя' })
	@ApiBody({ type: UpdateBalanceDto })
	@ApiResponse({
		status: 200,
		description: 'Баланс успешно обновлен',
		type: Balance,
	})
	@ApiResponse({ status: 404, description: 'Баланс не найден' })
	updateBalance(
		@Param('userId') userId: number,
		@Body() updateBalanceDto: UpdateBalanceDto,
	): Promise<Balance> {
		return this.balanceService.updateBalance(userId, updateBalanceDto.amount)
	}
}
