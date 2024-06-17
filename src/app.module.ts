import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BalanceModule } from './balance/balance.module'
import { CategoryModule } from './category/category.module'
import { TransactionsModule } from './transaction/transaction.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		UserModule,
		CategoryModule,
		AuthModule,
		TransactionsModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: +configService.get<number>('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				synchronize: true,
				logging: true,
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
			}),
			inject: [ConfigService],
		}),

		BalanceModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
