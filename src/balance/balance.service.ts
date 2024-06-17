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
		const balance = await this.balanceRepository.findOne({
			where: { user: { id: userId } },
		})
		if (!balance) {
			throw new NotFoundException('Баланс не найден')
		}
		return balance
	}

	async updateBalance(userId: number, amount: number): Promise<Balance> {
		const balance = await this.getBalance(userId)
		if (!balance) {
			throw new NotFoundException('Баланс не найден')
		}

		balance.amount = Number(balance.amount) + amount
		return this.balanceRepository.save(balance)
	}
}
