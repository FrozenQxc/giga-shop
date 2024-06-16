import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Transaction } from './entities/transaction.entity'
import { TransactionsService } from './transaction.service'

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
	constructor(private transactionsService: TransactionsService) {}

	@Get()
	@ApiOperation({ summary: 'Получить все транзакции' })
	@ApiResponse({
		status: 200,
		description: 'Список транзакций',
		type: [Transaction],
	})
	async findAll(): Promise<Transaction[]> {
		return this.transactionsService.findAll()
	}

	@Post()
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Создать транзакцию' })
	@ApiBody({ type: CreateTransactionDto })
	@ApiResponse({
		status: 201,
		description: 'Транзакция создана',
		type: Transaction,
	})
	async create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
		return this.transactionsService.create(createTransactionDto, +req.user.id)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Обновить транзакцию' })
	@ApiBody({ type: Transaction })
	@ApiResponse({ status: 200, description: 'Транзакция обновлена' })
	async update(
		@Param('id') id: number,
		@Body() transaction: Transaction,
	): Promise<void> {
		await this.transactionsService.update(id, transaction)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Удалить транзакцию' })
	@ApiResponse({ status: 200, description: 'Транзакция удалена' })
	async delete(@Param('id') id: number): Promise<void> {
		await this.transactionsService.delete(id)
	}
}
