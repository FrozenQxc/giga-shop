import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { Balance } from './entities/balance.entity'

@Injectable()
export class BalanceService {
	constructor(
		@InjectRepository(Balance)
		private readonly balanceRepository: Repository<Balance>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async getBalance(userId: number): Promise<Balance> {
		const balance = await this.balanceRepository.query(
			`SELECT * FROM balance WHERE "userId" = $1`,
			[userId],
		)

		if (balance.length === 0) {
			throw new NotFoundException('Баланс не найден')
		}

		return balance[0]
	}

	async updateBalance(userId: number, amount: number): Promise<Balance> {
		const balance = await this.getBalance(userId)
		if (!balance) {
			throw new NotFoundException('Баланс не найден')
		}

		const newAmount = Number(balance.amount) + amount

		await this.balanceRepository.query(
			`UPDATE balance SET amount = $1 WHERE "userId" = $2`,
			[newAmount, userId],
		)

		balance.amount = newAmount
		return balance
	}
}
