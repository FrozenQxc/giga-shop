import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	@ApiOperation({ summary: 'Логин пользователя' })
	@ApiBody({ type: LoginDto })
	@ApiResponse({ status: 200, description: 'Успешный логин' })
	@ApiResponse({ status: 401, description: 'Неверные учетные данные' })
	async login(@Request() req) {
		return this.authService.login(req.user)
	}

	@Get('profile')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Профиль пользователя' })
	@ApiResponse({ status: 200, description: 'Информация о профиле' })
	@ApiResponse({ status: 401, description: 'Неавторизован' })
	getProfile(@Request() req) {
		return req.user
	}
}
