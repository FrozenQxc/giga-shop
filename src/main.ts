import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Настройка Swagger
	const config = new DocumentBuilder()
		.setTitle('API Documentation')
		.setDescription('API description')
		.setVersion('1.0')
		.addTag('auth')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	await app.listen(3000)
}
bootstrap()
