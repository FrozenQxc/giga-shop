import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({
		example: 'test@mail.ru',
	})
	@IsEmail()
	email: string

	@ApiProperty({
		example: '123456',
		minLength: 6,
	})
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password: string
}
