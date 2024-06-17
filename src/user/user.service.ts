import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'
import { Balance } from 'src/balance/entities/balance.entity' // Импортируем сущность Balance
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Balance)
		private readonly balanceRepository: Repository<Balance>,
		private readonly jwtService: JwtService,
	) {}

	async create(createUserDto: CreateUserDto) {
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email,
			},
		})
		if (existUser) throw new BadRequestException('Такой пользователь уже есть')

		const user = await this.userRepository.save({
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password),
		})

		// Создаем баланс для нового пользователя
		const balance = this.balanceRepository.create({ user, amount: 0 })
		await this.balanceRepository.save(balance)

		// Привязываем баланс к пользователю
		user.balance = balance
		await this.userRepository.save(user)

		const token = this.jwtService.sign({ email: createUserDto.email })

		return { user, token }
	}

	async findOne(email: string) {
		return await this.userRepository.findOne({ where: { email: email } })
	}
}
