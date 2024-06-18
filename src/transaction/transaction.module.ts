import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/category/entities/category.entity'
import { Transaction } from './entities/transaction.entity'
import { TransactionsController } from './transaction.controller'
import { TransactionsService } from './transaction.service'

@Module({
	imports: [TypeOrmModule.forFeature([Transaction, Category])],
	controllers: [TransactionsController],
	providers: [TransactionsService],
})
export class TransactionsModule {}
