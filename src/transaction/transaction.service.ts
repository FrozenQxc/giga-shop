import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository, getConnection } from 'typeorm'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Transaction } from './entities/transaction.entity'

@Injectable()
export class TransactionsService {
	constructor(
		@InjectRepository(Transaction)
		private readonly transactionsRepository: Repository<Transaction>,
	) {}

	async findAll(): Promise<Transaction[]> {
		return this.transactionsRepository.find()
	}

	async findAllByUser(userId: number): Promise<Transaction[]> {
		return this.transactionsRepository.find({ where: { user: { id: userId } } })
	}

	async create(
		createTransactionDto: CreateTransactionDto,
		userId: number,
	): Promise<Transaction> {
		const newTransaction: DeepPartial<Transaction> = {
			title: createTransactionDto.title,
			amount: createTransactionDto.amount.toString(),
			type: createTransactionDto.type,
			category: createTransactionDto.category,
			user: { id: userId },
		}

		if (!newTransaction) {
			throw new BadRequestException('Что-то произошло не так')
		}

		return await this.transactionsRepository.save(newTransaction)
	}

	async update(id: number, transaction: Transaction): Promise<void> {
		await getConnection().transaction(async (transactionManager) => {
			await transactionManager.update(Transaction, id, transaction)
		})
	}

	async delete(id: number): Promise<void> {
		await getConnection().transaction(async (transactionManager) => {
			await transactionManager.delete(Transaction, id)
		})
	}
}
