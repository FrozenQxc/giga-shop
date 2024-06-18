import { BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Balance } from '../balance/entities/balance.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

const mockUserRepository = () => ({
	findOne: jest.fn(),
	save: jest.fn(),
	create: jest.fn(),
})

const mockBalanceRepository = () => ({
	save: jest.fn(),
	create: jest.fn(),
})

const mockJwtService = () => ({
	sign: jest.fn(),
})

describe('UserService', () => {
	let service: UserService
	let userRepository
	let balanceRepository
	let jwtService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{ provide: getRepositoryToken(User), useFactory: mockUserRepository },
				{
					provide: getRepositoryToken(Balance),
					useFactory: mockBalanceRepository,
				},
				{ provide: JwtService, useFactory: mockJwtService },
			],
		}).compile()

		service = module.get<UserService>(UserService)
		userRepository = module.get<Repository<User>>(getRepositoryToken(User))
		balanceRepository = module.get<Repository<Balance>>(
			getRepositoryToken(Balance),
		)
		jwtService = module.get<JwtService>(JwtService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('create', () => {
		it('should throw an error if user already exists', async () => {
			userRepository.findOne.mockResolvedValue({ email: 'test@mail.ru' })
			const createUserDto: CreateUserDto = {
				email: 'test@mail.ru',
				password: '123456',
			}

			await expect(service.create(createUserDto)).rejects.toThrow(
				BadRequestException,
			)
		})

		it('should create a new user, balance and return them with a token', async () => {
			userRepository.findOne.mockResolvedValue(null)
			userRepository.save.mockResolvedValue({
				id: 1,
				email: 'test@mail.ru',
				password: 'hashedPassword',
			})
			balanceRepository.save.mockResolvedValue({ id: 1, amount: 0 })
			jwtService.sign.mockReturnValue('token')

			const createUserDto: CreateUserDto = {
				email: 'test@mail.ru',
				password: '123456',
			}
			const result = await service.create(createUserDto)

			expect(result.user.email).toBe(createUserDto.email)
			expect(result.token).toBe('token')
		})
	})

	describe('findOne', () => {
		it('should find and return a user by email', async () => {
			const user = { id: 1, email: 'test@mail.ru', password: 'hashedPassword' }
			userRepository.findOne.mockResolvedValue(user)

			const result = await service.findOne('test@mail.ru')
			expect(result).toEqual(user)
		})
	})
})
