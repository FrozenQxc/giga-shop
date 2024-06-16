import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginDto {
	@ApiProperty({
		example: 'test@mail.ru',
	})
	@IsEmail()
	email: string

	@ApiProperty({ example: '123456' })
	@IsString()
	password: string
}
