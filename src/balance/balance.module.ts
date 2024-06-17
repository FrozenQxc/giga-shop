import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { BalanceController } from './balance.controller'
import { BalanceService } from './balance.service'
import { Balance } from './entities/balance.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Balance, User])],
	providers: [BalanceService],
	controllers: [BalanceController],
})
export class BalanceModule {}
