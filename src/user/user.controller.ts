import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/create')
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Создать нового пользователя' })
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({
		status: 201,
		description: 'Пользователь успешно создан',
		type: CreateUserDto,
	})
	@ApiResponse({ status: 400, description: 'Некорректные данные' })
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}
}
